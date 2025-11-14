const { loadImage, createCanvas } = require('canvas');
const { splitString, numberWithCommas } = require('./helpers');
const {
        WIDTH,
        // HEIGHT,
        SIDE_MARGIN,
        TOP_MARGIN1,
        TOP_MARGIN2,
        TOP_MARGIN3,
        TOP_MARGIN4,
        TOP_MARGIN5,
        TOP_MARGIN6,
        TOP_MARGIN7,
        TOP_MARGIN8,
        TOP_MARGIN9,
        TOP_MARGIN10,
        TOP_MARGIN11,
        TOP_MARGIN12,
        PROJECT_BRIEF_VERTICAL_SPACING,
        IMPACT_LENS_AND_LINE_SPACING,
        IMPACT_CORE_TOP_MARGIN,
        IMPACT_CORE_HORIZONTAL_SPACING,
        SDG_BIG_BOX_HEIGHT,
        SDG_BIG_BOX_WIDTH,
        SDG_SMALL_BOX_HEIGHT,
        SDG_SMALL_BOX_WIDTH,
        SDG_BOX_SPACING,
        SDG_TOP_MARGIN,
        BACKER_IMAGE_WIDTH,
        BACKER_IMAGE_HEIGHT,
        BACKER_IMAGE_LEFT_MARGIN,
        BACKER_IMAGE_TOP_MARGIN,
        IMPACT_POINTS_ICON_IMAGE_WIDTH,
        IMPACT_POINTS_ICON_IMAGE_HEIGHT,
        IMPACT_POINTS_ICON_IMAGE_LEFT_MARGIN,
        IMPACT_POINTS_ICON_IMAGE_TOP_MARGIN,
        BOUNTY_TYPE_LEGEND_WIDTH,
        BOUNTY_TYPE_LEGEND_HEIGHT,
        BOUNTY_TYPE_LEGEND_TOP_MARGIN,
        BOUNTY_TYPE_LEGEND_TEXT_TOP_MARGIN,
        BOUNTY_TYPE_LEGEND_LEFT_MARGIN1,
        BOUNTY_TYPE_LEGEND_LEFT_MARGIN2,
        BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN1,
        BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN2,
        BOUNTY_TYPE_BAR_HEIGHT,
        BOUNTY_TYPE_BAR_MAX_WIDTH,
        BOUNTY_TYPE_NUMBER_LEFT_MARGIN,
        BOUNTY_TYPE_BAR_LEFT_MARGIN,
        BOUNTY_TYPE_TEXT_TOP_MARGIN,
        BOUNTY_TYPE_NUMBER_TOP_MARGIN,
        BOUNTY_TYPE_TEXT_SPACING,
        BOUNTY_TYPE_NUMBER_SPACING,
        PARTITION_LINE_START_COORDINATES,
        BACKED_BY_LEFT_MARGIN,
        FUNDS_DEPLOYED_LEFT_MARGIN,
        IMPACT_POINTS_GAINED_LEFT_MARGIN,
        IMPACT_POINTS_AMOUNT_LEFT_MARGIN,
        BOUNTY_TYPES_LEFT_MARGIN,
        TOKEN_ID_LEFT_MARGIN,
        ISSUED_BY_LEFT_MARGIN,
        MINTED_ON_LEFT_MARGIN2,
        IMPACT_FOUNDRY_LEFT_MARGIN,
        CHAIN_NAME_LEFT_MARGIN2,
        IMPACT_FOUNDRY_LOGO_TOP_MARGIN,
        CHAIN_LOGO_TOP_MARGIN,
        IMPACT_FOUNDRY_LOGO_WIDTH,
        IMPACT_FOUNDRY_LOGO_HEIGHT,
        CHAIN_LOGO_WIDTH,
        CHAIN_LOGO_HEIGHT,
        BACKER_NAME_MAX_WIDTH,
        PROJECT_BRIEF_WIDTH,
        TEXT_STYLE_MAIN_HEADING,
        TEXT_STYLE_HEADING,
        TEXT_STYLE_HEADING1,
        TEXT_STYLE_CONTENT1,
        TEXT_STYLE_CONTENT2,
        TEXT_STYLE_CONTENT3,
        TEXT_STYLE_CONTENT4,
        TEXT_STYLE_CONTENT5,
        TEXT_STYLE_CONTENT6,
        TEXT_STYLE_CONTENT7,
        TEXT_STYLE_CONTENT8,
        TEXT_STYLE_IMPACT_LENS,
        TEXT_STYLE_BOUNTY_TYPE_LEGEND,
        MAIN_HEADING_COLOUR,
        HEADING_COLOUR,
        CONTENT_COLOUR,
        PARTITION_LINE_WIDTH,
        PARTITION_LINE_TOP_MARGIN,
        BACKGROUND_IMAGE,
        IMPACT_POINTS_ICON_IMAGE,
        BOUNTY_TYPE_LEGEND_IMAGE_GREEN,
        BOUNTY_TYPE_LEGEND_IMAGE_BROWN,
        BOUNTY_TYPE_BAR_IMAGE_GREEN,
        BOUNTY_TYPE_BAR_IMAGE_BROWN,
        IMPACT_FOUNDRY_LOGO_IMAGE,
        WATER_MARK_IMAGE,
        ATLANTIS_WATER_MARK_IMAGE,
        SUB_TARGET_LEFT_MARGIN,
        IMPACT_METRIC_LEFT_MARGIN,
        SUB_TARGET_CONTENT_TOP_MARGIN,
        IMPACT_METRIC_TITLE_TOP_MARGIN,
        IMPACT_METRIC_CONTENT_TOP_MARGIN,
        cores,
        sdgImages
} = require('./config');
const VERTICAL_ADJUSTMENT = 80
const HEIGHT = 1027 + VERTICAL_ADJUSTMENT;

const generateProjectCertificateImage = async (
                                        projectTitle,
                                        projectStartDate, // e.g. 12 May, 2025
                                        projectEndDate, // e.g. 09 Aug, 2025
                                        backer, // will include image & name
                                        fundsDeployedUSD,
                                        projectBrief,
                                        coreStatuses,
                                        sdgIndex,
                                        subTarget,
                                        impactIndicator,
                                        mintingDate,
                                        mintBlockchain, // will include image & name
                                        tokenId,
                                        fileLocation,
                                        preview = false
                                ) => {
    try {
    let textMetrics;
    const imageCanvas = createCanvas(WIDTH, HEIGHT);
    const context = imageCanvas.getContext('2d');

    const bgImage = await loadImage(BACKGROUND_IMAGE);
    context.drawImage(bgImage, 0, 0);
    if (preview) {
        context.drawImage(await loadImage(WATER_MARK_IMAGE), 0, 0);
    } else {
        const watermarkImage = await loadImage(ATLANTIS_WATER_MARK_IMAGE);
        const imgAspect = watermarkImage.width / watermarkImage.height;
        const canvasAspect = WIDTH / HEIGHT;
        let drawWidth, drawHeight;
        if (imgAspect > canvasAspect) {
            // Image is wider than canvas - fit to width
            drawWidth = WIDTH;
            drawHeight = WIDTH / imgAspect;
        } else {
            // Image is taller than canvas - fit to height
            drawHeight = HEIGHT;
            drawWidth = HEIGHT * imgAspect;
        }
        const x = (WIDTH - drawWidth) / 2;
        const y = (HEIGHT - drawHeight) / 2;
        context.drawImage(watermarkImage, x, y, drawWidth, drawHeight);
    }

    context.font = TEXT_STYLE_MAIN_HEADING;
    context.fillStyle = MAIN_HEADING_COLOUR;
    context.fillText('PROJECT IMPACT CERTIFICATE', SIDE_MARGIN, TOP_MARGIN1);

    context.font = TEXT_STYLE_CONTENT1;
    context.fillStyle = CONTENT_COLOUR;
    context.fillText(projectTitle, SIDE_MARGIN, TOP_MARGIN2);

    context.font = TEXT_STYLE_HEADING;
    context.fillStyle = HEADING_COLOUR;
    context.fillText(`Started on: ${projectStartDate}    Est. end date: ${projectEndDate}`, SIDE_MARGIN, TOP_MARGIN3);
    let image = await loadImage(backer.image);
    context.drawImage(image, BACKER_IMAGE_LEFT_MARGIN, BACKER_IMAGE_TOP_MARGIN, BACKER_IMAGE_WIDTH, BACKER_IMAGE_HEIGHT);
    context.fillText('BACKED BY', BACKED_BY_LEFT_MARGIN, TOP_MARGIN4);
    context.fillText('FUNDS DEPLOYED', FUNDS_DEPLOYED_LEFT_MARGIN, TOP_MARGIN4);
    context.font = TEXT_STYLE_CONTENT3;
    context.fillStyle = CONTENT_COLOUR;
    const backerNameString = splitString(context, backer.name, BACKER_NAME_MAX_WIDTH);
    context.fillText(backerNameString[0], BACKED_BY_LEFT_MARGIN, TOP_MARGIN5);
    if (backerNameString.length > 1) {
        context.fillText(backerNameString[1], BACKED_BY_LEFT_MARGIN, TOP_MARGIN6);
    }
    context.fillText(`$${numberWithCommas(Number(fundsDeployedUSD.toFixed(2)))}`, FUNDS_DEPLOYED_LEFT_MARGIN, TOP_MARGIN5);
    image = await loadImage(IMPACT_POINTS_ICON_IMAGE);

    context.font = TEXT_STYLE_HEADING;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('PROJECT BRIEF', SIDE_MARGIN, TOP_MARGIN7);
    context.font = TEXT_STYLE_CONTENT2;
    context.fillStyle = CONTENT_COLOUR;
    const summaryLines = splitString(context, projectBrief, PROJECT_BRIEF_WIDTH);
    for (let i=0; i<summaryLines.length; ++i) {
        context.fillText(summaryLines[i], SIDE_MARGIN, TOP_MARGIN8 + i*PROJECT_BRIEF_VERTICAL_SPACING);
    }

    let cumulativeWidth=0;
    for (let i=coreStatuses.length-1; i>=0; --i) {
        const coreImage = await loadImage(coreStatuses[i]?cores[i].activeImage:cores[i].inactiveImage);
        context.drawImage(coreImage, WIDTH-SIDE_MARGIN-cores[i].width-(coreStatuses.length-1-i)*IMPACT_CORE_HORIZONTAL_SPACING-cumulativeWidth, IMPACT_CORE_TOP_MARGIN, cores[i].width, cores[i].height);
        cumulativeWidth += cores[i].width;
    }

    context.font = TEXT_STYLE_IMPACT_LENS;
    context.fillStyle = HEADING_COLOUR;
    textMetrics = context.measureText('IMPACT LENS');
    context.fillText('IMPACT LENS', imageCanvas.width/2-textMetrics.width/2, TOP_MARGIN9 + VERTICAL_ADJUSTMENT);

    context.strokeStyle = HEADING_COLOUR;
    context.lineWidth = PARTITION_LINE_WIDTH;
    context.beginPath();
    context.moveTo(SIDE_MARGIN, PARTITION_LINE_TOP_MARGIN + VERTICAL_ADJUSTMENT);
    context.lineTo(imageCanvas.width/2-textMetrics.width/2-IMPACT_LENS_AND_LINE_SPACING, PARTITION_LINE_TOP_MARGIN + VERTICAL_ADJUSTMENT);
    context.stroke();

    context.strokeStyle = HEADING_COLOUR;
    context.lineWidth = PARTITION_LINE_WIDTH;
    context.beginPath();
    context.moveTo(imageCanvas.width/2+textMetrics.width/2+IMPACT_LENS_AND_LINE_SPACING, PARTITION_LINE_TOP_MARGIN + VERTICAL_ADJUSTMENT);
    context.lineTo(imageCanvas.width-SIDE_MARGIN, PARTITION_LINE_TOP_MARGIN + VERTICAL_ADJUSTMENT);
    context.stroke();

    context.font = TEXT_STYLE_HEADING;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('SDG', SIDE_MARGIN, TOP_MARGIN10 + VERTICAL_ADJUSTMENT);


    image = await loadImage(sdgImages[sdgIndex]);
    context.drawImage(image, SIDE_MARGIN, SDG_TOP_MARGIN + VERTICAL_ADJUSTMENT, SDG_BIG_BOX_WIDTH, SDG_BIG_BOX_HEIGHT);

    context.font = TEXT_STYLE_HEADING;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('SDG SUB-TARGET', SUB_TARGET_LEFT_MARGIN, TOP_MARGIN10 + VERTICAL_ADJUSTMENT);
    context.fillText('MEASURABLE IMPACT INTENSITY INDICATOR', IMPACT_METRIC_LEFT_MARGIN, IMPACT_METRIC_TITLE_TOP_MARGIN + VERTICAL_ADJUSTMENT);

    context.font = TEXT_STYLE_CONTENT8;
    context.fillStyle = CONTENT_COLOUR;
    context.fillText(subTarget, SUB_TARGET_LEFT_MARGIN, SUB_TARGET_CONTENT_TOP_MARGIN + VERTICAL_ADJUSTMENT);
    context.fillText(impactIndicator, IMPACT_METRIC_LEFT_MARGIN, IMPACT_METRIC_CONTENT_TOP_MARGIN + VERTICAL_ADJUSTMENT);

    context.font = TEXT_STYLE_HEADING1;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('Minted On', SIDE_MARGIN, TOP_MARGIN11 + VERTICAL_ADJUSTMENT);
    context.fillText('Token ID', TOKEN_ID_LEFT_MARGIN, TOP_MARGIN11 + VERTICAL_ADJUSTMENT);
    context.fillText('Minted On', MINTED_ON_LEFT_MARGIN2, TOP_MARGIN11 + VERTICAL_ADJUSTMENT);
    context.font = TEXT_STYLE_CONTENT5;
    context.fillStyle = CONTENT_COLOUR;
    context.fillText(mintingDate, SIDE_MARGIN, TOP_MARGIN12 + VERTICAL_ADJUSTMENT)
    context.fillText(tokenId, TOKEN_ID_LEFT_MARGIN, TOP_MARGIN12 + VERTICAL_ADJUSTMENT);
    image = await loadImage(mintBlockchain.image);
    context.drawImage(image, MINTED_ON_LEFT_MARGIN2, CHAIN_LOGO_TOP_MARGIN + VERTICAL_ADJUSTMENT, CHAIN_LOGO_WIDTH, CHAIN_LOGO_HEIGHT);
    context.fillText(mintBlockchain.name, CHAIN_NAME_LEFT_MARGIN2, TOP_MARGIN12 + VERTICAL_ADJUSTMENT, /*CHAIN_LOGO_WIDTH, CHAIN_LOGO_HEIGHT*/);

    const buffer = imageCanvas.toBuffer();
    await require('fs').promises.writeFile(fileLocation, buffer);
    } catch (error) {
        console.log("error encountered while generating project IC image", error);
        throw error;
    }
};

module.exports = generateProjectCertificateImage;