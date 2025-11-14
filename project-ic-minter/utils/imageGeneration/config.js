// Dimensions of different elements

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
const [BACKER_IMAGE_WIDTH, BACKER_IMAGE_HEIGHT] = [ 61, 61 ]; //checked
const [BACKER_IMAGE_LEFT_MARGIN, BACKER_IMAGE_TOP_MARGIN] = [ 57, 278.5 ]; //checked
const [IMPACT_POINTS_ICON_IMAGE_WIDTH, IMPACT_POINTS_ICON_IMAGE_HEIGHT] = [ 29, 26 ]; //checked
const [IMPACT_POINTS_ICON_IMAGE_LEFT_MARGIN, IMPACT_POINTS_ICON_IMAGE_TOP_MARGIN] = [ 1182, TOP_MARGIN5-25 ]; //checked
const [BOUNTY_TYPE_LEGEND_WIDTH, BOUNTY_TYPE_LEGEND_HEIGHT] = [ 20, 20 ];
const BOUNTY_TYPE_LEGEND_TOP_MARGIN = TOP_MARGIN10 - 20;
const BOUNTY_TYPE_LEGEND_TEXT_TOP_MARGIN = TOP_MARGIN10 - 5;
const BOUNTY_TYPE_LEGEND_LEFT_MARGIN1 = 1027;
const BOUNTY_TYPE_LEGEND_LEFT_MARGIN2 = 1091 + 50;
const BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN1 = 1055;
const BOUNTY_TYPE_LEGEND_TEXT_LEFT_MARGIN2 = 1117 + 50;

const BOUNTY_TYPE_BAR_HEIGHT = 32;
const BOUNTY_TYPE_BAR_MAX_WIDTH = 401;
const BOUNTY_TYPE_NUMBER_LEFT_MARGIN = 771;//810; //checked
const BOUNTY_TYPE_BAR_LEFT_MARGIN = 1025;//880; //checked
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
const TEXT_STYLE_CONTENT7 = 'bold 26px Inter';
const TEXT_STYLE_CONTENT8 = '24px Inter';
const TEXT_STYLE_IMPACT_LENS = 'bold 16px Inter'; //checked
const TEXT_STYLE_BOUNTY_TYPE_LEGEND = '20px Inter'; //checked
const MAIN_HEADING_COLOUR = '#FBCF4E'; //checked
const HEADING_COLOUR = '#A8A8A8'; //checked
const CONTENT_COLOUR = '#FFFFFF'; //checked
const PARTITION_LINE_WIDTH = 1;
const PARTITION_LINE_TOP_MARGIN = 542.5;

const BACKGROUND_IMAGE = 'assets/projectImpactCertificateBg.png';
const IMPACT_POINTS_ICON_IMAGE = 'assets/impactPointsIcon.png';
const BOUNTY_TYPE_LEGEND_IMAGE_GREEN = 'assets/circleGreen.png';
const BOUNTY_TYPE_LEGEND_IMAGE_BROWN = 'assets/circleBrown.png';
const BOUNTY_TYPE_BAR_IMAGE_GREEN = 'assets/rectangleGreen.png';
const BOUNTY_TYPE_BAR_IMAGE_BROWN = 'assets/rectangleBrown.png';
const IMPACT_FOUNDRY_LOGO_IMAGE = 'assets/foundryLogo.png';
const WATER_MARK_IMAGE = 'assets/projectImpactCertificateWatermark.png';
const ATLANTIS_WATER_MARK_IMAGE = 'assets/atlantisWatermark.png';

// details required only for image generator v2
const MINTED_ON_LEFT_MARGIN2 = 565;
const SUB_TARGET_LEFT_MARGIN = 300;
const IMPACT_METRIC_LEFT_MARGIN = 300;
const SUB_TARGET_CONTENT_TOP_MARGIN = TOP_MARGIN10 + 30;
const IMPACT_METRIC_TITLE_TOP_MARGIN = SDG_TOP_MARGIN+SDG_SMALL_BOX_HEIGHT+SDG_BOX_SPACING;
const IMPACT_METRIC_CONTENT_TOP_MARGIN = IMPACT_METRIC_TITLE_TOP_MARGIN + 30;
const CHAIN_NAME_LEFT_MARGIN2 = 565 + 50;;

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


module.exports = {
    WIDTH,
    HEIGHT,
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
    MINTED_ON_LEFT_MARGIN,
    IMPACT_FOUNDRY_LEFT_MARGIN,
    CHAIN_NAME_LEFT_MARGIN,
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
    MINTED_ON_LEFT_MARGIN2,
    SUB_TARGET_LEFT_MARGIN,
    IMPACT_METRIC_LEFT_MARGIN,
    SUB_TARGET_CONTENT_TOP_MARGIN,
    IMPACT_METRIC_TITLE_TOP_MARGIN,
    IMPACT_METRIC_CONTENT_TOP_MARGIN,
    CHAIN_NAME_LEFT_MARGIN2,
    cores,
    sdgImages
};