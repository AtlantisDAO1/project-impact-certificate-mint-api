from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import JsonOutputParser
import os
from dotenv import load_dotenv
import pandas as pd
import requests
from io import BytesIO
import json
from media_verifier import MediaVerifier

load_dotenv()

# --- Configuration ---
SDG_EXCEL_URL = os.getenv("SDG_EXCEL_URL")
IMPACT_CORES = ["Water", "Earth", "Energy", "Social"]

# --- Load SDG Data ---
def load_sdg_data():
    """Load SDG and sub-targets from Excel file"""
    try:
        response = requests.get(SDG_EXCEL_URL)
        response.raise_for_status()
        
        # Read Excel file
        excel_file = BytesIO(response.content)
        df = pd.read_excel(excel_file)
        
        # Build structured SDG data with all fields
        sdg_data = {}

        for _, row in df.iterrows():
            sdg_num = str(row.get('SDG \nNumber', '')).strip()
            sdg_name = str(row.get('SDG Name', '')).strip()
            sub_target = str(row.get('Sub-Target \nNumber', '')).strip()
            description = str(row.get('Sub-Target Description', '')).strip()
            short_name = str(row.get('Short Name* (Max 100 chars)', '')).strip()
            indicator = str(row.get('Measurable Impact Intensity Indicator', '')).strip()
            
            if sdg_num and sub_target:
                if sdg_num not in sdg_data:
                    sdg_data[sdg_num] = {
                        'sdg_name': sdg_name,
                        'sub_targets': []
                    }
                sdg_data[sdg_num]['sub_targets'].append({
                    'sub_target_number': sub_target,
                    'sub_target_description': description,
                    'short_name': short_name,
                    'measurable_impact_intensity_indicator': indicator
                })

        return sdg_data
    except Exception as e:
        print(f"Error loading SDG data: {e}")
        # Fallback to basic SDG list if file can't be loaded
        return {
            "1": {
                "sdg_name": "No Poverty",
                "sub_targets": [{
                    "sub_target_number": "1.1",
                    "sub_target_description": "Eradicate extreme poverty",
                    "short_name": "Extreme Poverty",
                    "measurable_impact_intensity_indicator": "Population below poverty line"
                }]
            }
        }

# Load SDG data at startup
SDG_DATA = load_sdg_data()

# --- Initialize LLM ---
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.3
)

# --- Initialize Media Verifier ---
media_verifier = MediaVerifier()

# --- Pydantic Models ---
class ProjectInput(BaseModel):
    title: str = Field(..., description="Title of the project")
    description: str = Field(..., description="Detailed description of the project")

class SDGInfo(BaseModel):
    sdg_number: str = Field(..., description="SDG number (e.g., '6')")
    sdg_name: str = Field(..., description="SDG name (e.g., 'Clean Water and Sanitation')")

class SDGSubTargetInfo(BaseModel):
    sub_target_number: str = Field(..., description="Sub-target number (e.g., '6.1')")
    sub_target_description: str = Field(..., description="Full description of the sub-target")
    short_name: str = Field(..., description="Short name or title of the sub-target")
    measurable_impact_intensity_indicator: str = Field(..., description="Indicator for measuring impact")

class ProjectClassification(BaseModel):
    impact_cores: List[str] = Field(..., description="List of relevant impact cores")
    sdg: SDGInfo = Field(..., description="Primary SDG information")
    sdg_sub_target: SDGSubTargetInfo = Field(..., description="Single most relevant SDG sub-target")
    reasoning: str = Field(..., description="Brief explanation of the classification")

class MediaVerificationRequest(BaseModel):
    claim: str = Field(..., description="The project claim to verify against the media")
    media_urls: List[str] = Field(..., description="List of public URLs to media files (images or videos)")

# --- Helper Functions ---
def create_classification_prompt(title: str, description: str) -> str:
    """Create a structured prompt for LLM classification"""
    
    # Format SDG data for prompt
    sdg_info = []
    for sdg_num, sdg_content in SDG_DATA.items():
        sdg_name = sdg_content['sdg_name']
        targets_info = []
        for target in sdg_content['sub_targets'][:5]:  # Limit to first 5
            targets_info.append(
                f"    - {target['sub_target_number']}: {target['short_name']} - {target['sub_target_description']}"
            )
        targets_str = "\n".join(targets_info)
        sdg_info.append(f"SDG {sdg_num}: {sdg_name}\n{targets_str}")
    
    sdg_reference = "\n\n".join(sdg_info)
    
    prompt = f"""You are an expert at classifying projects based on their impact and alignment with Sustainable Development Goals (SDGs).

Given a project, you need to classify it into:
1. Impact Cores (can be multiple): {', '.join(IMPACT_CORES)}
2. Primary SDG: One main SDG the project aligns with
3. ONE SDG Sub-target: The single most relevant sub-target within the chosen SDG

IMPACT CORES DEFINITIONS:
- Water: Projects related to water conservation, purification, access, management, or water-related ecosystems
- Earth: Projects related to land, soil, agriculture, biodiversity, forests, or terrestrial ecosystems
- Energy: Projects related to renewable energy, energy efficiency, power generation, or energy access
- Social: Projects related to education, health, equality, poverty, community development, or human welfare

AVAILABLE SDGs AND SUB-TARGETS:
{sdg_reference}

PROJECT TO CLASSIFY:
Title: {title}
Description: {description}

INSTRUCTIONS:
1. Analyze the project carefully
2. Select ALL relevant impact cores (can be 1-4)
3. Choose the PRIMARY SDG that best fits the project's main objective
4. Select ONLY ONE sub-target from that SDG that is most relevant
5. Provide brief reasoning for your classification

Return your response in the following JSON format:
{{
    "impact_cores": ["Core1", "Core2"],
    "sdg_number": "6",
    "sdg_sub_target_number": "6.1",
    "reasoning": "Brief explanation of why these classifications were chosen"
}}

IMPORTANT: 
- sdg_number should be just the number (e.g., "6", not "SDG 6")
- sdg_sub_target_number should match exactly one of the sub-targets from the SDG you chose
- Select only ONE sub-target, the most relevant one
- Ensure the response is valid JSON and impact_cores are from the allowed list."""
    
    return prompt

async def classify_project(title: str, description: str) -> ProjectClassification:
    """Use LLM to classify the project"""
    try:
        # Create prompt

        prompt = create_classification_prompt(title, description)
        
        # Create messages

        messages = [
            SystemMessage(content="You are a precise classification system. Always respond with valid JSON only."),
            HumanMessage(content=prompt)
        ]
        
        # Get LLM response

        response = llm.invoke(messages)
        
        # Parse response

        response_text = response.content.strip()
        
        # Clean response if it contains markdown code blocks
        if response_text.startswith("```json"):

            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):

            response_text = response_text.replace("```", "").strip()
        
        # Parse JSON

        result = json.loads(response_text)
        
        # Validate impact cores
        valid_cores = [core for core in result.get('impact_cores', []) if core in IMPACT_CORES]

        if not valid_cores:

            valid_cores = ["Social"]  # Default fallback
        
        # Get SDG number and validate
        sdg_number = str(result.get('sdg_number', '1')).strip()

        if sdg_number not in SDG_DATA:

            sdg_number = list(SDG_DATA.keys())[0]  # Use first SDG as fallback
        

        sdg_info_data = SDG_DATA[sdg_number]
        
        # Get sub-target number and find full details

        sub_target_number = result.get('sdg_sub_target_number', '')

        sub_target_details = None
        

        for target in sdg_info_data['sub_targets']:

            if target['sub_target_number'] == sub_target_number:

                sub_target_details = target

                break
        
        # If not found, use first sub-target as fallback

        if not sub_target_details and sdg_info_data['sub_targets']:

            sub_target_details = sdg_info_data['sub_targets'][0]
        
        # Create classification object

        classification = ProjectClassification(
            impact_cores=valid_cores,
            sdg=SDGInfo(
                sdg_number=sdg_number,
                sdg_name=sdg_info_data['sdg_name']
            ),
            sdg_sub_target=SDGSubTargetInfo(
                sub_target_number=sub_target_details['sub_target_number'],
                sub_target_description=sub_target_details['sub_target_description'],
                short_name=sub_target_details['short_name'],
                measurable_impact_intensity_indicator=sub_target_details['measurable_impact_intensity_indicator']
            ),
            reasoning=result.get('reasoning', 'No reasoning provided')
        )
        
        return classification
        
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response as JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Classification error: {str(e)}")

# --- FastAPI App ---
app = FastAPI(title="Project Classification API")

@app.post("/classify", response_model=ProjectClassification)
async def classify_project_endpoint(project: ProjectInput):
    """
    Classify a project into impact cores, SDG, and SDG sub-targets
    
    - **title**: Title of the project
    - **description**: Detailed description of what the project does
    """
    try:
        classification = await classify_project(project.title, project.description)
        return classification
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/impact-cores")
async def get_impact_cores():
    """Get list of available impact cores"""
    return {"impact_cores": IMPACT_CORES}

@app.get("/sdgs")
async def get_sdgs():
    """Get list of available SDGs and their sub-targets"""
    return {"sdgs": SDG_DATA}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "sdgs_loaded": len(SDG_DATA),
        "impact_cores": len(IMPACT_CORES)
    }

@app.post("/verify-media")
async def verify_media_endpoint(request: MediaVerificationRequest):
    """
    Verify media files against a project claim.
    
    - **claim**: The text description/claim of the project.
    - **media_urls**: List of public URLs to images or videos.
    """
    try:
        results = media_verifier.verify_media(request.media_urls, request.claim)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""
POST /classify
{
    "title": "Solar Water Purification System",
    "description": "A project to develop and deploy solar-powered water purification systems in rural communities lacking access to clean drinking water. The system uses renewable energy to purify contaminated water sources."
}

Response:
{
    "impact_cores": ["Water", "Energy"],
    "sdg": {
        "sdg_number": "6",
        "sdg_name": "Clean Water and Sanitation"
    },
    "sdg_sub_target": {
        "sub_target_number": "6.1",
        "sub_target_description": "By 2030, achieve universal and equitable access to safe and affordable drinking water for all",
        "short_name": "Safe drinking water",
        "measurable_impact_intensity_indicator": "Proportion of population using safely managed drinking water services"
    },
    "reasoning": "This project directly addresses water quality and access (Water core) while utilizing renewable energy (Energy core). It aligns with SDG 6 (Clean Water and Sanitation), specifically targeting universal access to safe drinking water (6.1)."
}
"""

# Run with: uvicorn filename:app --reload