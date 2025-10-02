
// Dimensions of different elements

const { loadImage, createCanvas } = require('canvas');

const [WIDTH, HEIGHT] = [ 1611, 1027 ];//[ 2054, 1027 ] //checked
const SIDE_MARGIN = 57; //checked
const [
        TOP_MARGIN1, //checked 
        TOP_MARGIN2, //checked
        TOP_MARGIN3, //checked
        TOP_MARGIN4, //checked
        TOP_MARGIN5, //checked
        TOP_MARGIN6, //checked
        TOP_MARGIN7, //checked
        TOP_MARGIN8, //checked 
        TOP_MARGIN9, //checked
        TOP_MARGIN10, //checked
        TOP_MARGIN11, //checked
        TOP_MARGIN12
    ] = [ 91, 174, 223, 289, 323, 357, 419, 460, 550, 620, 922, 965  ];
        // [ 101, 177, 248, 310, 338, 444, 475, 589.5, 645, 942, 965 ];
const PROJECT_BRIEF_VERTICAL_SPACING = 34; //checked
const IMPACT_LENS_AND_LINE_SPACING = 10;
const IMPACT_CORE_TOP_MARGIN = 52; //checked
const IMPACT_CORE_HORIZONTAL_SPACING = 15; //checked
const SDG_BIG_BOX_HEIGHT = 212;
const SDG_BIG_BOX_WIDTH = 194;
const SDG_SMALL_BOX_HEIGHT = 101;
const SDG_SMALL_BOX_WIDTH = 92;
const SDG_BOX_SPACING = SDG_BIG_BOX_HEIGHT - 2 * SDG_SMALL_BOX_HEIGHT;
const SDG_TOP_MARGIN = 628;
const [VERIFIED_IMAGE_WIDTH, VERIFIED_IMAGE_HEIGHT] = [158.78, 125.7];//[ 137, 126 ]; //checked
const [VERIFIED_IMAGE_LEFT_MARGIN, VERIFIED_IMAGE_TOP_MARGIN] = [ 1395.22, 849.3]//[ 1417, 849 ]; //checked
const [BACKER_IMAGE_WIDTH, BACKER_IMAGE_HEIGHT] = [ 61, 61 ]; //checked
const [BACKER_IMAGE_LEFT_MARGIN, BACKER_IMAGE_TOP_MARGIN] = [ 57, 278.5 ]; //checked
const [IMPACT_POINTS_ICON_IMAGE_WIDTH, IMPACT_POINTS_ICON_IMAGE_HEIGHT] = [ 29, 26 ]; //checked
const [IMPACT_POINTS_ICON_IMAGE_LEFT_MARGIN, IMPACT_POINTS_ICON_IMAGE_TOP_MARGIN] = [ 1182, TOP_MARGIN5-25 ]; //checked
const [BOUNTY_TYPE_LEGEND_WIDTH, BOUNTY_TYPE_LEGEND_HEIGHT] = [ 20, 20 ];
const BOUNTY_TYPE_LEGEND_TOP_MARGIN = TOP_MARGIN10 - 20;
const BOUNTY_TYPE_LEGEND_TEXT_TOP_MARGIN = TOP_MARGIN10 - 5;
const BOUNTY_TYPE_LEGEND_LEFT_MARGIN1 = 910;
const BOUNTY_TYPE_LEGEND_LEFT_MARGIN2 = 974 + 50;
const BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN1 = 938;
const BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN2 = 1000 + 50;

const BOUNTY_TYPE_BAR_HEIGHT = 32;
const BOUNTY_TYPE_BAR_MAX_WIDTH = 401;
const BOUNTY_TYPE_NUMBER_LEFT_MARGIN = 771;//810; //checked
const BOUNTY_TYPE_BAR_LEFT_MARGIN = 895;//880; //checked
const BOUNTY_TYPE_TEXT_TOP_MARGIN = 667;
const BOUNTY_TYPE_NUMBER_TOP_MARGIN = 665;
const BOUNTY_TYPE_TEXT_SPACING = 41;
const BOUNTY_TYPE_NUMBER_SPACING = 41.5;
const PARTITION_LINE_START_COORDINATES = [830, 665-15];
const BACKED_BY_LEFT_MARGIN = 134; //checked
const FUNDS_DEPLOYED_LEFT_MARGIN = 940; //checked
const IMPACT_POINTS_GAINED_LEFT_MARGIN = 1182; //checked
const IMPACT_POINTS_AMOUNT_LEFT_MARGIN = 1218;
const BOUNTY_TYPES_LEFT_MARGIN = 565; //checked
const TOKEN_ID_LEFT_MARGIN = 310;
const ISSUED_BY_LEFT_MARGIN = 565;  //checked
const MINTED_ON_LEFT_MARGIN = 900 + 80 - 70;//840;
const IMPACT_FOUNDRY_LEFT_MARGIN = 565 + 50;//680;
const CHAIN_NAME_LEFT_MARGIN = 950 + 80 - 70;//900;
const IMPACT_FOUNDRY_LOGO_TOP_MARGIN = 935;
const CHAIN_LOGO_TOP_MARGIN = 935;
const [ IMPACT_FOUNDRY_LOGO_WIDTH, IMPACT_FOUNDRY_LOGO_HEIGHT ] = [ 39, 39 ];
const [ CHAIN_LOGO_WIDTH, CHAIN_LOGO_HEIGHT ] = [ 37, 37 ];
const BACKER_NAME_MAX_WIDTH = 761; //checked
const PROJECT_BRIEF_WIDTH = 1497; //checked

const TEXT_STYLE_MAIN_HEADING = 'bold 40.36px Inter'; //checked
const TEXT_STYLE_HEADING = 'bold 20px Inter'; //checked
const TEXT_STYLE_HEADING1 = 'bold 24px Inter';
const TEXT_STYLE_CONTENT1 = 'bold 37.6px Inter'; //checked
const TEXT_STYLE_CONTENT2 = 'italic 28px Inter';
const TEXT_STYLE_CONTENT3 = '28px Inter'; //checked
const TEXT_STYLE_CONTENT4 = '20px Inter'; //checked
const TEXT_STYLE_CONTENT5 = '32px Inter'; // checked
const TEXT_STYLE_CONTENT6 = '26px Inter'; //checked
const TEXT_STYLE_IMPACT_LENS = 'bold 16px Inter'; //checked
const TEXT_STYLE_BOUNTY_TYPE_LEGEND = '20px Inter'; //checked
const MAIN_HEADING_COLOUR = '#FBCF4E'; //checked
const HEADING_COLOUR = '#A8A8A8'; //checked
const CONTENT_COLOUR = '#FFFFFF'; //checked
const PARTITION_LINE_WIDTH = 1;
const PARTITION_LINE_TOP_MARGIN = 542.5;

const BACKGROUND_IMAGE = 'assets/projectImpactCertificateBg.png';
const VERIFIED_IMAGE = 'assets/verifiedBadge.png';
const IMPACT_POINTS_ICON_IMAGE = 'assets/impactPointsIcon.png';
const BOUNTY_TYPE_LEGEND_IMAGE_GREEN = 'assets/circleGreen.png';
const BOUNTY_TYPE_LEGEND_IMAGE_BROWN = 'assets/circleBrown.png';
const BOUNTY_TYPE_BAR_IMAGE_GREEN = 'assets/rectangleGreen.png';
const BOUNTY_TYPE_BAR_IMAGE_BROWN = 'assets/rectangleBrown.png';
const IMPACT_FOUNDRY_LOGO_IMAGE = 'assets/foundryLogo.png';
const WATER_MARK_IMAGE = 'assets/projectImpactCertificateWatermark.png';


const cores = [
    {
        activeImage: 'assets/coreWater.png',
        inactiveImage: 'assets/coreWaterInactive.png',
        height: 42.53,
        width: 32.92,
    },
    {
        activeImage: 'assets/coreEarth.png',
        inactiveImage: 'assets/coreEarthInactive.png',
        height: 43.9,
        width: 42.53,
    },
    {
        activeImage: 'assets/coreEnergy.png',
        inactiveImage: 'assets/coreEnergyInactive.png',
        height: 43.9,
        width: 42.53,
    },
    {
        activeImage: 'assets/coreSocial.png',
        inactiveImage: 'assets/coreSocialInactive.png',
        height: 43.9,
        width: 30.18,
    },
];

const sdgImages = [
                    'assets/sdg01.png',
                    'assets/sdg02.png',
                    'assets/sdg03.png',
                    'assets/sdg04.png',
                    'assets/sdg05.png',
                    'assets/sdg06.png',
                    'assets/sdg07.png',
                    'assets/sdg08.png',
                    'assets/sdg09.png',
                    'assets/sdg10.png',
                    'assets/sdg11.png',
                    'assets/sdg12.png',
                    'assets/sdg13.png',
                    'assets/sdg14.png',
                    'assets/sdg15.png',
                    'assets/sdg16.png',
                    'assets/sdg17.png'
                ];

// function to split the impactBrief into lines
const splitString = (context, str, maxWidthPerLine) => {
    if (typeof str !== 'string' || typeof maxWidthPerLine !== 'number' || maxWidthPerLine <= 0) {
        throw new Error('Invalid input. Please provide a valid string and a positive number.');
    }
    const result = [];
    let currentLine = '';
    // Split the string into substrings
    str.split(' ').forEach(word => {
        if (context.measureText(currentLine + (currentLine.length > 0 ? ' ' : '') + word).width <= maxWidthPerLine) {
            currentLine = currentLine + (currentLine.length > 0 ? ' ' : '') + word;
        } else {
            result.push(currentLine);
            currentLine = word;
        }
    });
    // Add the last substring
    if (currentLine.length > 0) {
        result.push(currentLine);
    }
    return result;
}

const numberWithCommas = (number) => {
    let numStr = String(number);
    let parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts.length > 1) {
        parts[1] = convertAndTrimDecimals(parts[1], 5);
        if (parts[1].length > 0) {
            return parts.join('.')
        }
    }
    return parts[0];
}

function convertAndTrimDecimals(decimalString, decimalPlaces) {    
    // If length is less than or equals decimalPlaces, remove trailing zeros and return
    if (decimalString.length <= decimalPlaces) {
        return decimalString.replace(/0+$/, '');
    }
    
    // If length > decimalPlaces, need to check rounding
    const nextDigit = parseInt(decimalString[decimalPlaces]);
    
    if (nextDigit >= 5) {
        // Need to round up
        let result = '';
        let carry = 1;
        
        // Process digits from right to left
        for (let i = decimalPlaces - 1; i >= 0; i--) {
            let digit = parseInt(decimalString[i]) + carry;
            if (digit === 10) {
                digit = 0;
                carry = 1;
            } else {
                carry = 0;
            }
            result = digit.toString() + result;
        }
        
        return result.replace(/0+$/, ''); // Remove trailing zeros
    } else {
        // Just truncate to decimalPlaces digits and remove trailing zeros
        return decimalString.substring(0, decimalPlaces).replace(/0+$/, '');
    }
}

const generateProjectCertificateImage = async (
                                        projectTitle,
                                        projectStartDate, // e.g. 12 May, 2025
                                        projectEndDate, // e.g. 09 Aug, 2025
                                        backer, // will include image & name
                                        fundsDeployedUSD,
                                        impactPointsIssued,
                                        projectBrief,
                                        coreStatuses,
                                        projectSdgs,
                                        uniqueBountyAcceptanceCounts, // type, passCount, failCount
                                        mintingDate,
                                        mintBlockchain, // will include image & name
                                        tokenId,
                                        fileLocation,
                                        preview = false
                                ) => {
    try {
    console.log('SDGS...',projectSdgs);
    const sdgs = projectSdgs.slice(0, 5);
    let textMetrics;

    const imageCanvas = createCanvas(WIDTH, HEIGHT);
    const context = imageCanvas.getContext('2d');

    const bgImage = await loadImage(BACKGROUND_IMAGE);
    context.drawImage(bgImage, 0, 0);
    if (preview) {
        context.drawImage(await loadImage(WATER_MARK_IMAGE), 0, 0);
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
    context.fillText('IMPACT POINTS GAINED', IMPACT_POINTS_GAINED_LEFT_MARGIN, TOP_MARGIN4);
    context.font = TEXT_STYLE_CONTENT3;
    context.fillStyle = CONTENT_COLOUR;
    const backerNameString = splitString(context, backer.name, BACKER_NAME_MAX_WIDTH);
    context.fillText(backerNameString[0], BACKED_BY_LEFT_MARGIN, TOP_MARGIN5);
    if (backerNameString.length > 1) {
        context.fillText(backerNameString[1], BACKED_BY_LEFT_MARGIN, TOP_MARGIN6);
    }
    // context.fillText(backer.name, BACKED_BY_LEFT_MARGIN, TOP_MARGIN5);
    context.fillText(`$${numberWithCommas(fundsDeployedUSD)}`, FUNDS_DEPLOYED_LEFT_MARGIN, TOP_MARGIN5);
    image = await loadImage(IMPACT_POINTS_ICON_IMAGE);
    context.drawImage(image, IMPACT_POINTS_ICON_IMAGE_LEFT_MARGIN, IMPACT_POINTS_ICON_IMAGE_TOP_MARGIN, IMPACT_POINTS_ICON_IMAGE_WIDTH, IMPACT_POINTS_ICON_IMAGE_HEIGHT);
    context.fillText(`${numberWithCommas(impactPointsIssued)} IP`, IMPACT_POINTS_AMOUNT_LEFT_MARGIN, TOP_MARGIN5);

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
    context.fillText('IMPACT LENS', imageCanvas.width/2-textMetrics.width/2, TOP_MARGIN9);

    context.strokeStyle = HEADING_COLOUR;
    context.lineWidth = PARTITION_LINE_WIDTH;
    context.beginPath();
    context.moveTo(SIDE_MARGIN, PARTITION_LINE_TOP_MARGIN);
    context.lineTo(imageCanvas.width/2-textMetrics.width/2-IMPACT_LENS_AND_LINE_SPACING, PARTITION_LINE_TOP_MARGIN);
    context.stroke();

    context.strokeStyle = HEADING_COLOUR;
    context.lineWidth = PARTITION_LINE_WIDTH;
    context.beginPath();
    context.moveTo(imageCanvas.width/2+textMetrics.width/2+IMPACT_LENS_AND_LINE_SPACING, PARTITION_LINE_TOP_MARGIN);
    context.lineTo(imageCanvas.width-SIDE_MARGIN, PARTITION_LINE_TOP_MARGIN);
    context.stroke();

    context.font = TEXT_STYLE_HEADING;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('SDGs', SIDE_MARGIN, TOP_MARGIN10);
    // SDG PRINTING CODE STARTS
    if (sdgs.length > 0) {
        image = await loadImage(sdgImages[sdgs[0]]);
        if (sdgs.length !== 4) {
            context.drawImage(image, SIDE_MARGIN, SDG_TOP_MARGIN, SDG_BIG_BOX_WIDTH, SDG_BIG_BOX_HEIGHT);
        } else {
            context.drawImage(image, SIDE_MARGIN, SDG_TOP_MARGIN, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
        }
    }
    // print second SDG
    if (sdgs.length >= 2) {
        image = await loadImage(sdgImages[sdgs[1]]);
        if (sdgs.length == 2) {
            context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN, SDG_BIG_BOX_WIDTH, SDG_BIG_BOX_HEIGHT);
        } else if(sdgs.length === 3 || sdgs.length === 5) {
            context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
        } else { // case for length 4
            context.drawImage(image, SIDE_MARGIN, SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
        }
    }
    // print third SDG
    if (sdgs.length === 3) {
        image = await loadImage(sdgImages[sdgs[2]]);
        context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    } else if (sdgs.length === 4) {
        image = await loadImage(sdgImages[sdgs[2]]);
        context.drawImage(image, SIDE_MARGIN+SDG_SMALL_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    } else if (sdgs.length === 5) {
        image = await loadImage(sdgImages[sdgs[2]]);
        context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING+SDG_SMALL_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    }
    // print fourth SDG
    if (sdgs.length === 4) {
        image = await loadImage(sdgImages[sdgs[3]]);
        context.drawImage(image, SIDE_MARGIN+SDG_SMALL_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    } else if (sdgs.length === 5) {
        image = await loadImage(sdgImages[sdgs[3]]);
        context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    }
    // print fifth SDG
    if (sdgs.length === 5) {
        image = await loadImage(sdgImages[sdgs[4]]);
        context.drawImage(image, SIDE_MARGIN+SDG_BIG_BOX_WIDTH+SDG_BOX_SPACING+SDG_SMALL_BOX_WIDTH+SDG_BOX_SPACING, SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING, SDG_SMALL_BOX_WIDTH, SDG_SMALL_BOX_HEIGHT);
    }

    context.fillText('BOUNTY TYPES', BOUNTY_TYPES_LEFT_MARGIN, TOP_MARGIN10);
    image = await loadImage(BOUNTY_TYPE_LEGEND_IMAGE_GREEN);
    context.drawImage(image, BOUNTY_TYPE_LEGEND_LEFT_MARGIN1, BOUNTY_TYPE_LEGEND_TOP_MARGIN, BOUNTY_TYPE_LEGEND_WIDTH, BOUNTY_TYPE_LEGEND_HEIGHT);
    image = await loadImage(BOUNTY_TYPE_LEGEND_IMAGE_BROWN);
    context.drawImage(image, BOUNTY_TYPE_LEGEND_LEFT_MARGIN2, BOUNTY_TYPE_LEGEND_TOP_MARGIN, BOUNTY_TYPE_LEGEND_WIDTH, BOUNTY_TYPE_LEGEND_HEIGHT);
    context.font = TEXT_STYLE_BOUNTY_TYPE_LEGEND;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('passed', BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN1, BOUNTY_TYPE_LEGEND_TEXT_TOP_MARGIN);
    context.fillText('failed', BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN2, BOUNTY_TYPE_LEGEND_TEXT_TOP_MARGIN);

    context.font = TEXT_STYLE_CONTENT2;
    context.fillStyle = CONTENT_COLOUR;
    if (uniqueBountyAcceptanceCounts.length > 0) {
        const acceptanceCountForMaxBarWidth = uniqueBountyAcceptanceCounts[0].passCount + uniqueBountyAcceptanceCounts[0].failCount;
        for (let i=0; i<uniqueBountyAcceptanceCounts.length; ++i) {
            // type, passCount, failCount
            /*
            calculate the totalCount
            calculate the pass bar width
            calculate the fail bar width
            print bounty type
            print total Count
            print pass bar
            print fail bar
            print the pass count
            */
            const { type, passCount, failCount } = uniqueBountyAcceptanceCounts[i];
            const passBarWidth = (passCount/acceptanceCountForMaxBarWidth)*BOUNTY_TYPE_BAR_MAX_WIDTH;
            const failBarWidth = (failCount/acceptanceCountForMaxBarWidth)*BOUNTY_TYPE_BAR_MAX_WIDTH;
            context.font = TEXT_STYLE_CONTENT6;
            context.fillText(type, BOUNTY_TYPES_LEFT_MARGIN, BOUNTY_TYPE_TEXT_TOP_MARGIN + i * (BOUNTY_TYPE_TEXT_SPACING));
            context.font = TEXT_STYLE_CONTENT4;
            context.fillText(numberWithCommas(passCount+failCount), BOUNTY_TYPE_NUMBER_LEFT_MARGIN, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING));
            if (passCount > 0) {
                textMetrics = context.measureText(numberWithCommas(passCount));
                context.fillText(numberWithCommas(passCount), BOUNTY_TYPE_BAR_LEFT_MARGIN-5-textMetrics.width/*PASS_COUNT_LEFT_MARGIN*/, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING));
            }
            image = await loadImage(BOUNTY_TYPE_BAR_IMAGE_GREEN);
            context.drawImage(image, BOUNTY_TYPE_BAR_LEFT_MARGIN, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING) -23/*BOUNTY_TYPE_BAR_TOP_MARGIN + i * (BOUNTY_TYPE_BAR_SPACING)*/, passBarWidth, BOUNTY_TYPE_BAR_HEIGHT);
            image = await loadImage(BOUNTY_TYPE_BAR_IMAGE_BROWN);
            context.drawImage(image, BOUNTY_TYPE_BAR_LEFT_MARGIN+passBarWidth, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING) -23, failBarWidth, BOUNTY_TYPE_BAR_HEIGHT);
            if (failCount > 0) {
                context.fillText(numberWithCommas(failCount), BOUNTY_TYPE_BAR_LEFT_MARGIN+passBarWidth+failBarWidth+5, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING));
            }
            //context.fillText(numberWithCommas(passCount), BOUNTY_TYPE_BAR_INSIDE_NUMBER_LEFT_MARGIN, BOUNTY_TYPE_NUMBER_TOP_MARGIN + i * (BOUNTY_TYPE_NUMBER_SPACING));
        }
        const separatorLineEnding = BOUNTY_TYPE_NUMBER_TOP_MARGIN + (uniqueBountyAcceptanceCounts.length-1) * (BOUNTY_TYPE_NUMBER_SPACING) + 3;
        context.strokeStyle = HEADING_COLOUR;
        context.lineWidth = PARTITION_LINE_WIDTH;
        context.beginPath();
        context.moveTo(PARTITION_LINE_START_COORDINATES[0], PARTITION_LINE_START_COORDINATES[1]);
        context.lineTo(PARTITION_LINE_START_COORDINATES[0], separatorLineEnding);
        context.stroke();
    }
    
    
    context.font = TEXT_STYLE_HEADING1;
    context.fillStyle = HEADING_COLOUR;
    context.fillText('Minted On', SIDE_MARGIN, TOP_MARGIN11);
    context.fillText('Token ID', TOKEN_ID_LEFT_MARGIN, TOP_MARGIN11);
    context.fillText('Issued by', ISSUED_BY_LEFT_MARGIN, TOP_MARGIN11);
    context.fillText('Minted On', MINTED_ON_LEFT_MARGIN, TOP_MARGIN11);
    context.font = TEXT_STYLE_CONTENT5;
    context.fillStyle = CONTENT_COLOUR;
    context.fillText(mintingDate, SIDE_MARGIN, TOP_MARGIN12)
    context.fillText(tokenId, TOKEN_ID_LEFT_MARGIN, TOP_MARGIN12);
    image = await loadImage(IMPACT_FOUNDRY_LOGO_IMAGE);
    context.drawImage(image, ISSUED_BY_LEFT_MARGIN, IMPACT_FOUNDRY_LOGO_TOP_MARGIN, IMPACT_FOUNDRY_LOGO_WIDTH, IMPACT_FOUNDRY_LOGO_HEIGHT);
    context.fillText('Impact Foundry', IMPACT_FOUNDRY_LEFT_MARGIN, TOP_MARGIN12);
    image = await loadImage(mintBlockchain.image);
    context.drawImage(image, MINTED_ON_LEFT_MARGIN, CHAIN_LOGO_TOP_MARGIN, CHAIN_LOGO_WIDTH, CHAIN_LOGO_HEIGHT);
    context.fillText(mintBlockchain.name, CHAIN_NAME_LEFT_MARGIN, TOP_MARGIN12, /*CHAIN_LOGO_WIDTH, CHAIN_LOGO_HEIGHT*/);

    image = await loadImage(VERIFIED_IMAGE);
    context.drawImage(image, VERIFIED_IMAGE_LEFT_MARGIN, VERIFIED_IMAGE_TOP_MARGIN, VERIFIED_IMAGE_WIDTH, VERIFIED_IMAGE_HEIGHT);

    const buffer = imageCanvas.toBuffer();
    await require('fs').promises.writeFile(fileLocation, buffer);
    console.log('successfully generated project IC image')
    } catch (error) {
        console.log("error encountered while generating project IC image", error);   
    }
};

const testImageGeneration = async () => {
    const projectTitle = 'Resilient Water Network';
    const projectStartDate = '12 May, 2025';
    const projectEndDate = '09 Aug, 2025';
    const backer = {
        name: 'Lorem ipsum dolor sit amet consectetur. Senectus id venenatis ultricies ut maecenas sagittis euismod.',
        image: 'https://atlantis-staging-bucket.s3.ap-south-1.amazonaws.com/images/1749108909488-yellowMetaIcon.png'
    };
    const fundsDeployedUSD = 1000000;
    const impactPointsIssued = 1000000;
    const projectBrief = 'Lorem ipsum dolor sit amet consectetur. Ipsum aliquam fusce nisl tempor turpis gravida consequat eget in. Cursus ut odio vulputate dictumst nullam turpis auctor sit turpis ut diam condimentum maecenas.';
    const coreStatuses = [true, true, true, true];
    const projectSdgs = [1, 2, 3, 4, 5];
    const uniqueBountyAcceptanceCounts = [
        {
            type: 'Total',
            passCount: 100,
            failCount: 20
        },
        {
            type: 'GHG Removal',
            passCount: 90,
            failCount: 20
        },
        {
            type: 'Sampling',
            passCount: 10,
            failCount: 2
        },
        {
            type: 'Data Science',
            passCount: 80,
            failCount: 30
        },
        {
            type: 'Others',
            passCount: 40,
            failCount: 30
        },
    ];
    const mintingDate = '12 May, 2025';
    const mintBlockchain = {
        name: 'Optimism',
        image: 'https://atlantis-staging-bucket.s3.ap-south-1.amazonaws.com/auxiliary/images/image1740054968965.png'
    };
    const tokenId = '1234567890';
    const fileLocation = '/Users/altar/Desktop/test.png';
    console.log('projectSdgs', projectSdgs);
    await generateProjectCertificateImage(projectTitle, projectStartDate, projectEndDate, backer, fundsDeployedUSD, impactPointsIssued, projectBrief, coreStatuses, projectSdgs, uniqueBountyAcceptanceCounts, mintingDate, mintBlockchain, tokenId, fileLocation);

};

//module.exports = testImageGeneration;
module.exports = generateProjectCertificateImage;