import os
import requests
import json
import time
from typing import Dict, Any, Optional, List
from io import BytesIO
import mimetypes
from PIL import Image
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

class MediaVerifier:
    def __init__(self, model_name: str = "gemini-2.0-flash", temperature: float = 0.0):
        """
        Initialize the MediaVerifier with a Gemini model.
        """
        self.llm = ChatGoogleGenerativeAI(
            model=model_name,
            temperature=temperature,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

    def _load_image(self, image_source: str) -> str:
        """
        Load an image from a URL or local path and return it as a base64 string or 
        compatible input for LangChain Gemini (which usually accepts image URLs or data).
        
        For LangChain Google GenAI, we can pass the image URL directly if it's public,
        or we might need to download it. To be robust, let's download/open and 
        pass the image data.
        """
        try:
            if image_source.startswith('http'):
                headers = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                }
                response = requests.get(image_source, headers=headers)
                response.raise_for_status()
                image_data = response.content
            else:
                with open(image_source, 'rb') as f:
                    image_data = f.read()
            
            # Verify it's a valid image
            img = Image.open(BytesIO(image_data))
            # Convert to RGB if needed (e.g. for PNGs with alpha) to avoid issues
            if img.mode != 'RGB':
                img = img.convert('RGB')
                # Save it back to bytes
                buffer = BytesIO()
                img.save(buffer, format="JPEG")
                image_data = buffer.getvalue()
                
            import base64
            b64_data = base64.b64encode(image_data).decode('utf-8')
            return f"data:image/jpeg;base64,{b64_data}"

        except Exception as e:
            raise ValueError(f"Failed to load image from {image_source}: {e}")

    def _upload_media(self, media_source: str) -> Any:
        """
        Uploads media (video) to Google Gen AI File API and waits for it to be processed.
        """
        try:
            # If it's a URL, download it first
            if media_source.startswith('http'):
                headers = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                }
                response = requests.get(media_source, headers=headers, stream=True)
                response.raise_for_status()
                
                # Create a temporary file
                import tempfile
                suffix = mimetypes.guess_extension(response.headers.get('content-type', '')) or ".mp4"
                with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
                    for chunk in response.iter_content(chunk_size=8192):
                        tmp_file.write(chunk)
                    tmp_path = tmp_file.name
            else:
                tmp_path = media_source

            print(f"Uploading file: {tmp_path}")
            file_obj = genai.upload_file(tmp_path)
            print(f"Uploaded: {file_obj.name}")

            # Wait for processing
            while file_obj.state.name == "PROCESSING":
                print("Processing video...")
                time.sleep(2)
                file_obj = genai.get_file(file_obj.name)

            if file_obj.state.name == "FAILED":
                raise ValueError("Video processing failed.")

            # Clean up temp file if we downloaded it
            if media_source.startswith('http'):
                os.remove(tmp_path)
                
            return file_obj

        except Exception as e:
            raise ValueError(f"Failed to upload media from {media_source}: {e}")

    def verify_media(self, image_sources: List[str], claim_text: str) -> List[Dict[str, Any]]:
        """
        Analyzes multiple media files (images or videos) to detect if they are junk and if they match the claim.
        
        Args:
            image_sources: List of URLs or local paths to the images/videos.
            claim_text: The text description/claim of the project.
            
        Returns:
            List of JSON dictionaries with verification results for each media.
        """
        results = []
        
        for source in image_sources:
            file_obj = None
            try:
                # Determine if it's a video
                mime_type, _ = mimetypes.guess_type(source)
                is_video = mime_type and mime_type.startswith('video')
                
                # Also check extension if mime guess fails or for common video extensions
                if not is_video:
                    ext = os.path.splitext(source)[1].lower()
                    if ext in ['.mp4', '.mov', '.avi', '.mkv', '.webm']:
                        is_video = True

                content_part = {}
                
                if is_video:
                    file_obj = self._upload_media(source)
                    # For LangChain Google GenAI, we pass the file URI
                    # The format depends on the specific version, but typically for gemini-pro-vision / gemini-1.5
                    # we can pass the file URI in a specific way or use the genai library directly.
                    # Since we are using ChatGoogleGenerativeAI, let's try passing the file_uri.
                    # Note: LangChain's support for File API URIs might vary. 
                    # A robust way is to use the "image_url" type but with the file URI, 
                    # OR use a "media" type if supported.
                    # However, standard LangChain usually expects base64 or public http URLs for images.
                    # For videos via File API, we might need to construct the message differently 
                    # or use the underlying client.
                    
                    # Let's try passing it as a "media" type or "image_url" with the uri
                    # Actually, for Gemini, we can pass the file object directly if using the genai SDK,
                    # but here we are using LangChain.
                    # LangChain's `ChatGoogleGenerativeAI` handles `image_url` by downloading.
                    # It doesn't natively support the File API URI in `image_url` field out of the box in all versions.
                    
                    # WORKAROUND: We will construct the message payload that LangChain passes to the model.
                    # If LangChain doesn't support it, we might need to use `genai` directly for videos.
                    # Let's try to use `genai` directly for the generation if it's a video, 
                    # to be safe and avoid LangChain abstraction issues with File API.
                    
                    model = genai.GenerativeModel(self.llm.model)
                    
                    prompt = f"""
                    You are an expert forensic analyst and project auditor.
                    
                    Your task is to analyze the provided video in the context of the following project claim:
                    "{claim_text}"
                    
                    1. **Junk Detection**: Determine if the video is "junk". Junk is defined as:
                       - Completely black or white content.
                       - Random noise or corrupted data.
                       - Extremely blurry to the point of being unrecognizable.
                       - Generic stock footage that clearly doesn't depict real project work.
                       - Irrelevant content.
                       
                    2. **Claim Verification**: Determine if the video content *supports* or *contradicts* the claim.
                       - Does the video show what is described?
                       - Is it consistent with the project description?
                       
                    Output your analysis in the following JSON format ONLY:
                    {{
                        "is_junk": boolean,
                        "junk_reason": "string (explain why it is junk, or null if not)",
                        "matches_claim": boolean,
                        "match_reason": "string (explain why it matches or does not match the claim)",
                        "confidence_score": float (0.0 to 1.0)
                    }}
                    """
                    
                    response = model.generate_content([prompt, file_obj])
                    content = response.text.strip()
                    
                else:
                    # Image path
                    image_data_url = self._load_image(source)
                    
                    prompt = f"""
                    You are an expert forensic analyst and project auditor.
                    
                    Your task is to analyze the provided image in the context of the following project claim:
                    "{claim_text}"
                    
                    1. **Junk Detection**: Determine if the image is "junk". Junk is defined as:
                       - Completely black or white images.
                       - Random noise or corrupted data.
                       - Extremely blurry to the point of being unrecognizable.
                       - Generic stock photos that clearly don't depict real project work (use your best judgment, but be lenient if it looks plausible).
                       - Irrelevant content (e.g., a selfie, a meme, a screenshot of a game) that has absolutely nothing to do with the claim.
                       
                    2. **Claim Verification**: Determine if the image content *supports* or *contradicts* the claim.
                       - Does the image show what is described?
                       - Is it consistent with the project description?
                       
                    Output your analysis in the following JSON format ONLY:
                    {{
                        "is_junk": boolean,
                        "junk_reason": "string (explain why it is junk, or null if not)",
                        "matches_claim": boolean,
                        "match_reason": "string (explain why it matches or does not match the claim)",
                        "confidence_score": float (0.0 to 1.0)
                    }}
                    """
                    
                    messages = [
                        HumanMessage(
                            content=[
                                {"type": "text", "text": prompt},
                                {"type": "image_url", "image_url": image_data_url}
                            ]
                        )
                    ]
                    
                    response = self.llm.invoke(messages)
                    content = response.content.strip()
                
                # Clean up code blocks if present
                if content.startswith("```json"):
                    content = content.replace("```json", "").replace("```", "").strip()
                elif content.startswith("```"):
                    content = content.replace("```", "").strip()
                    
                result = json.loads(content)
                result["source"] = source
                results.append(result)
                
            except Exception as e:
                results.append({
                    "source": source,
                    "error": str(e),
                    "is_junk": None,
                    "matches_claim": None
                })
            finally:
                # Cleanup: Delete the file from Gen AI storage
                if file_obj:
                    try:
                        print(f"Deleting file: {file_obj.name}")
                        genai.delete_file(file_obj.name)
                    except Exception as e:
                        print(f"Error deleting file {file_obj.name}: {e}")
                
        return results

if __name__ == "__main__":
    # Simple test
    verifier = MediaVerifier()
    # You would need a real image path/URL here to test
    print("MediaVerifier initialized. Run tests to verify.")
