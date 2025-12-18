const Joi = require('joi');
const validImpactCores = ['Water', 'Earth', 'Energy', 'Social'];
const validSdgs = [
    'No poverty',
    'Zero hunger',
    'Good health & well-being',
    'Quality education',
    'Gender equality',
    'Clean water & sanitation',
    'Affordable & clean energy',
    'Decent work & economic growth',
    'Industry, innovation & infrastructure',
    'Reduced inequalities',
    'Sustainable cities & communities',
    'Responsible consumption & production',
    'Climate action',
    'Life below water',
    'Life on land',
    'Peace, justice & strong institutions',
    'Partnerships for the goals'
];
const validSdgSubTargets = [
  "Eradicate extreme poverty",
  "Reduce multidimensional poverty",
  "Social protection systems",
  "Equal economic rights and land access",
  "Resilience to climate shocks",
  "Mobilize development finance",
  "Pro-poor policy frameworks",
  "End hunger and ensure food access",
  "End malnutrition",
  "Double smallholder productivity",
  "Sustainable food production",
  "Genetic diversity conservation",
  "Agricultural investment",
  "Reduce agricultural subsidies",
  "Stabilize food prices",
  "Reduce maternal mortality",
  "End preventable child deaths",
  "End AIDS, TB, malaria epidemics",
  "Reduce NCD premature mortality",
  "Prevent substance abuse",
  "Reduce road traffic deaths",
  "Universal sexual/reproductive health",
  "Universal health coverage",
  "Reduce pollution and hazardous chemicals",
  "Tobacco control policies",
  "Vaccine-preventable diseases",
  "Health workforce density",
  "Early warning health systems",
  "Primary education completion",
  "Quality early childhood development",
  "Technical and tertiary education access",
  "Youth employment skills",
  "Equal educational access",
  "Sustainability education",
  "Safe, inclusive learning environments",
  "Safe learning environments",
  "Qualified teachers training",
  "Increase supply of qualified teachers",
  "Eliminate discrimination against women",
  "Eliminate violence against women",
  "Eliminate harmful practices",
  "Childcare and domestic support",
  "Women's leadership participation",
  "Women's reproductive health access",
  "Women's economic rights access",
  "Women empowerment via technology",
  "Gender equality policies",
  "Clean drinking water access",
  "Adequate sanitation and hygiene",
  "Improve water quality",
  "Increase water-use efficiency",
  "Transboundary water cooperation",
  "Protect water-related ecosystems",
  "Water/sanitation development finance",
  "Local community water management",
  "Universal modern energy access",
  "Increase renewable energy share",
  "Double energy efficiency improvement",
  "Clean energy research investment",
  "Expand sustainable energy infrastructure",
  "Increase economic productivity",
  "Decent work for all",
  "End forced labour",
  "Stop illicit financial flows",
  "Youth productive employment",
  "End child labour",
  "End modern slavery and child labour",
  "Protect labour rights",
  "Promote sustainable tourism",
  "Expand financial access",
  "Aid for Trade support",
  "Youth employment strategies",
  "Resilient infrastructure development",
  "Increase industry share",
  "Small-scale industry finance access",
  "Sustainable industrial upgrades",
  "Technology capacity strengthening",
  "Infrastructure development support",
  "Industrial diversification policies",
  "Universal ICT access",
  "Bottom 40% income growth",
  "Social and economic inclusion",
  "Reduce inequalities of outcome",
  "Sustainable development policies",
  "Financial market regulation effectiveness",
  "Official development assistance",
  "Safe and orderly migration",
  "Special differential treatment",
  "Aid to vulnerable countries",
  "Lower remittance transaction costs",
  "Sustainable housing access",
  "Sustainable transport systems",
  "Participatory urban planning",
  "Cultural and natural heritage",
  "Reduce disaster impacts",
  "Improve city air quality",
  "Public green space access",
  "Urban-rural integration policies",
  "Integrated resilience plans",
  "Sustainable and resilient buildings",
  "SCP programmes implemented",
  "Improve resource efficiency",
  "Reduce food waste",
  "Safe chemical waste management",
  "Waste generation reduction",
  "Corporate sustainable practices",
  "Sustainable procurement",
  "Sustainable development awareness",
  "Technology transfer investment",
  "Sustainable tourism monitoring",
  "Fossil fuel subsidies elimination",
  "Climate resilience capacity",
  "National climate adaptation plans",
  "Climate education and awareness",
  "Climate finance mobilization",
  "Climate action in vulnerable countries",
  "Prevent marine pollution",
  "Protect marine ecosystems",
  "Reduce ocean acidification",
  "Sustainable fisheries management",
  "Marine protected areas",
  "Fishery subsidies elimination",
  "Sustainable fisheries benefits",
  "Ocean research and capacity",
  "Small-scale fishers market access",
  "UNCLOS conservation implementation",
  "Terrestrial ecosystem conservation",
  "Forest protection and reforestation",
  "Land degradation restoration",
  "Mountain biodiversity conservation",
  "Threatened species protection",
  "Genetic resources benefit sharing",
  "End poaching and trafficking",
  "Invasive species management",
  "Ecosystem and biodiversity planning",
  "Ecosystem conservation finance",
  "Sustainable forest management",
  "Anti-poaching operations",
  "Reduce violence everywhere",
  "Protect children from violence",
  "Rule of law and justice access",
  "Stop illicit arms and financial flows",
  "Reduce corruption and bribery",
  "Effective and transparent institutions",
  "Inclusive decision-making",
  "Global governance participation",
  "Legal identity for all",
  "Public access to information",
  "Institutional capacity-building support",
  "Non-discriminatory laws",
  "Domestic resource mobilization",
  "ODA commitments fulfillment",
  "Additional finance mobilized",
  "Sustainable technology adoptions",
  "Capacity-building initiatives",
  "Technology bank operationalization",
  "Environmentally sound technologies",
  "Technology bank & ICT access",
  "Capacity-building initiatives",
  "Equitable multilateral trading system",
  "Increase LDC export share",
  "Duty-free market access",
  "Macroeconomic stability policies",
  "SDG policy coherence",
  "National policy space",
  "Multi-stakeholder partnerships",
  "Effective partnerships",
  "High-quality SDG data capacity",
  "SDG progress measurement"
];

const sdgToSubTargets = {
  "No Poverty": {
    "sdgNumber": 1,
    "subTargets": [
      {
        "subTargetNumber": "1.1",
        "description": "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
        "shortName": "Eradicate extreme poverty"
      },
      {
        "subTargetNumber": "1.2",
        "description": "By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
        "shortName": "Reduce multidimensional poverty"
      },
      {
        "subTargetNumber": "1.3",
        "description": "Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable",
        "shortName": "Social protection systems"
      },
      {
        "subTargetNumber": "1.4",
        "description": "By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance",
        "shortName": "Equal economic rights and land access"
      },
      {
        "subTargetNumber": "1.5",
        "description": "By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters",
        "shortName": "Resilience to climate shocks"
      },
      {
        "subTargetNumber": "1.a",
        "description": "Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions",
        "shortName": "Mobilize development finance"
      },
      {
        "subTargetNumber": "1.b",
        "description": "Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions",
        "shortName": "Pro-poor policy frameworks"
      }
    ]
  },
  "Zero hunger": {
    "sdgNumber": 2,
    "subTargets": [
      {
        "subTargetNumber": "2.1",
        "description": "By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round",
        "shortName": "End hunger and ensure food access"
      },
      {
        "subTargetNumber": "2.2",
        "description": "By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons",
        "shortName": "End malnutrition"
      },
      {
        "subTargetNumber": "2.3",
        "description": "By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment",
        "shortName": "Double smallholder productivity"
      },
      {
        "subTargetNumber": "2.4",
        "description": "By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality",
        "shortName": "Sustainable food production"
      },
      {
        "subTargetNumber": "2.5",
        "description": "By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed",
        "shortName": "Genetic diversity conservation"
      },
      {
        "subTargetNumber": "2.a",
        "description": "Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks in order to enhance agricultural productive capacity in developing countries, in particular least developed countries",
        "shortName": "Agricultural investment"
      },
      {
        "subTargetNumber": "2.b",
        "description": "Correct and prevent trade restrictions and distortions in world agricultural markets, including through the parallel elimination of all forms of agricultural export subsidies and all export measures with equivalent effect, in accordance with the mandate of the Doha Development Round",
        "shortName": "Reduce agricultural subsidies"
      },
      {
        "subTargetNumber": "2.c",
        "description": "Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility",
        "shortName": "Stabilize food prices"
      }
    ]
  },
  "Good health & well-being": {
    "sdgNumber": 3,
    "subTargets": [
      {
        "subTargetNumber": "3.1",
        "description": "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births",
        "shortName": "Reduce maternal mortality"
      },
      {
        "subTargetNumber": "3.2",
        "description": "By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to move the neonatal mortality rate to at least as low as 12 per 1,000 live births and the under-five mortality rate to at least as low as 25 per 1,000 live births",
        "shortName": "End preventable child deaths"
      },
      {
        "subTargetNumber": "3.3",
        "description": "By 2030, end the epidemics of AIDS, tuberculosis, malaria and combat other communicable diseases and begin to address non-communicable diseases and mental health",
        "shortName": "End AIDS, TB, malaria epidemics"
      },
      {
        "subTargetNumber": "3.4",
        "description": "By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being",
        "shortName": "Reduce NCD premature mortality"
      },
      {
        "subTargetNumber": "3.5",
        "description": "Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol",
        "shortName": "Prevent substance abuse"
      },
      {
        "subTargetNumber": "3.6",
        "description": "By 2020, halve the number of global deaths and injuries from road traffic accidents",
        "shortName": "Reduce road traffic deaths"
      },
      {
        "subTargetNumber": "3.7",
        "description": "By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes",
        "shortName": "Universal sexual/reproductive health"
      },
      {
        "subTargetNumber": "3.8",
        "description": "Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines",
        "shortName": "Universal health coverage"
      },
      {
        "subTargetNumber": "3.9",
        "description": "By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination",
        "shortName": "Reduce pollution and hazardous chemicals"
      },
      {
        "subTargetNumber": "3.a",
        "description": "Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate",
        "shortName": "Tobacco control policies"
      },
      {
        "subTargetNumber": "3.b",
        "description": "Support the research and development of vaccines and medicines for the communicable and non-communicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade Related Aspects of Intellectual Property Rights regarding flexibilities to protect public health, and, in particular, provide access to medicines for all",
        "shortName": "Vaccine-preventable diseases"
      },
      {
        "subTargetNumber": "3.c",
        "description": "Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States",
        "shortName": "Health workforce density"
      },
      {
        "subTargetNumber": "3.d",
        "description": "Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks",
        "shortName": "Early warning health systems"
      }
    ]
  },
  "Quality education": {
    "sdgNumber": 4,
    "subTargets": [
      {
        "subTargetNumber": "4.1",
        "description": "By 2030, ensure that all girls and boys complete free primary and secondary education that is equitable and of good quality leading to relevant learning outcomes",
        "shortName": "Primary education completion"
      },
      {
        "subTargetNumber": "4.2",
        "description": "By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education so that they are ready for primary education",
        "shortName": "Quality early childhood development"
      },
      {
        "subTargetNumber": "4.3",
        "description": "By 2030, ensure equal access for all women and men to quality technical, vocational and tertiary education, including university",
        "shortName": "Technical and tertiary education access"
      },
      {
        "subTargetNumber": "4.4",
        "description": "By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship",
        "shortName": "Youth employment skills"
      },
      {
        "subTargetNumber": "4.5",
        "description": "By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations",
        "shortName": "Equal educational access"
      },
      {
        "subTargetNumber": "4.6",
        "description": "By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture's contribution to sustainable development",
        "shortName": "Sustainability education"
      },
      {
        "subTargetNumber": "4.7",
        "description": "Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, non-violent, inclusive and effective learning environments for all",
        "shortName": "Safe, inclusive learning environments"
      },
      {
        "subTargetNumber": "4.a",
        "description": "Build and upgrade inclusive and equitable quality education facilities that provide safe, non-violent, inclusive and effective learning environments for all",
        "shortName": "Safe learning environments"
      },
      {
        "subTargetNumber": "4.b",
        "description": "By 2030, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries",
        "shortName": "Qualified teachers training"
      },
      {
        "subTargetNumber": "4.c",
        "description": "By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing States",
        "shortName": "Increase supply of qualified teachers"
      }
    ]
  },
  "Gender equality": {
    "sdgNumber": 5,
    "subTargets": [
      {
        "subTargetNumber": "5.1",
        "description": "End all discrimination and violence against all women and girls everywhere",
        "shortName": "Eliminate discrimination against women"
      },
      {
        "subTargetNumber": "5.2",
        "description": "Eliminate all forms of violence against and exploitation of women and girls, including trafficking and sexual and other types of exploitation",
        "shortName": "Eliminate violence against women"
      },
      {
        "subTargetNumber": "5.3",
        "description": "Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation",
        "shortName": "Eliminate harmful practices"
      },
      {
        "subTargetNumber": "5.4",
        "description": "Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate",
        "shortName": "Childcare and domestic support"
      },
      {
        "subTargetNumber": "5.5",
        "description": "Ensure women's full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic and public life",
        "shortName": "Women’s leadership participation"
      },
      {
        "subTargetNumber": "5.6",
        "description": "Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences",
        "shortName": "Women’s reproductive health access"
      },
      {
        "subTargetNumber": "5.a",
        "description": "Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws",
        "shortName": "Women’s economic rights access"
      },
      {
        "subTargetNumber": "5.b",
        "description": "Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women",
        "shortName": "Women empowerment via technology"
      },
      {
        "subTargetNumber": "5.c",
        "description": "Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels",
        "shortName": "Gender equality policies"
      }
    ]
  },
  "Clean water & sanitation": {
    "sdgNumber": 6,
    "subTargets": [
      {
        "subTargetNumber": "6.1",
        "description": "By 2030, achieve universal and equitable access to safe and affordable drinking water for all",
        "shortName": "Clean drinking water access"
      },
      {
        "subTargetNumber": "6.2",
        "description": "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations",
        "shortName": "Adequate sanitation and hygiene"
      },
      {
        "subTargetNumber": "6.3",
        "description": "By 2030, improve water quality and reduce pollution, eliminate dumping and minimize release of hazardous chemicals and materials, halve the proportion of untreated wastewater and substantially increase recycling and safe reuse globally",
        "shortName": "Improve water quality"
      },
      {
        "subTargetNumber": "6.4",
        "description": "By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity",
        "shortName": "Increase water-use efficiency"
      },
      {
        "subTargetNumber": "6.5",
        "description": "By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate",
        "shortName": "Transboundary water cooperation"
      },
      {
        "subTargetNumber": "6.6",
        "description": "By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes",
        "shortName": "Protect water-related ecosystems"
      },
      {
        "subTargetNumber": "6.a",
        "description": "By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies",
        "shortName": "Water/sanitation development finance"
      },
      {
        "subTargetNumber": "6.b",
        "description": "Support and strengthen the participation of local communities in improving water and sanitation management",
        "shortName": "Local community water management"
      }
    ]
  },
  "Affordable & clean energy": {
    "sdgNumber": 7,
    "subTargets": [
      {
        "subTargetNumber": "7.1",
        "description": "By 2030, ensure universal access to modern energy services",
        "shortName": "Universal modern energy access"
      },
      {
        "subTargetNumber": "7.2",
        "description": "By 2030, increase the share of renewable energy globally",
        "shortName": "Increase renewable energy share"
      },
      {
        "subTargetNumber": "7.3",
        "description": "By 2030, double the global rate of improvement in energy efficiency",
        "shortName": "Double energy efficiency improvement"
      },
      {
        "subTargetNumber": "7.a",
        "description": "By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology",
        "shortName": "Clean energy research investment"
      },
      {
        "subTargetNumber": "7.b",
        "description": "By 2030, expand infrastructure for sustainable energy services for all in developing countries, in particular least developed countries and small island developing States, in accordance with their respective programmes of support",
        "shortName": "Expand sustainable energy infrastructure"
      }
    ]
  },
  "Decent work & economic growth": {
    "sdgNumber": 8,
    "subTargets": [
      {
        "subTargetNumber": "8.1",
        "description": "By 2030, achieve higher levels of economic productivity through innovation, upgrading, including through a focus on high-value added and labour-intensive sectors",
        "shortName": "Increase economic productivity"
      },
      {
        "subTargetNumber": "8.2",
        "description": "By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value",
        "shortName": "Decent work for all"
      },
      {
        "subTargetNumber": "8.3",
        "description": "By 2030, eradicate forced labour and child labour and eliminate other forms of contemporary slavery",
        "shortName": "End forced labour"
      },
      {
        "subTargetNumber": "8.4",
        "description": "By 2030, eliminate illicit financial and arms flows, and strengthen the recovery and return of stolen assets and combat all forms of organized crime",
        "shortName": "Stop illicit financial flows"
      },
      {
        "subTargetNumber": "8.5",
        "description": "By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value",
        "shortName": "Youth productive employment"
      },
      {
        "subTargetNumber": "8.6",
        "description": "By 2020, eradicate child labour in all its forms, and all forms of forced labour",
        "shortName": "End child labour"
      },
      {
        "subTargetNumber": "8.7",
        "description": "Take immediate and effective measures to eradicate forced labour, end modern slavery and child labour, and secure the prohibition and elimination of the worst forms of child labour",
        "shortName": "End modern slavery and child labour"
      },
      {
        "subTargetNumber": "8.8",
        "description": "Protect labour rights and safe working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment",
        "shortName": "Protect labour rights"
      },
      {
        "subTargetNumber": "8.9",
        "description": "By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products",
        "shortName": "Promote sustainable tourism"
      },
      {
        "subTargetNumber": "8.10",
        "description": "Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all",
        "shortName": "Expand financial access"
      },
      {
        "subTargetNumber": "8.a",
        "description": "Increase Aid for Trade support for developing countries, in particular least developed countries, to enhance their productive capacity and trade capacity",
        "shortName": "Aid for Trade support"
      },
      {
        "subTargetNumber": "8.b",
        "description": "By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact",
        "shortName": "Youth employment strategies"
      }
    ]
  },
  "Industry, innovation & infrastructure": {
    "sdgNumber": 9,
    "subTargets": [
      {
        "subTargetNumber": "9.1",
        "description": "Develop reliable, sustainable, resilient and quality infrastructure to support economic development and human well-being, with a focus on affordable and equitable access for all",
        "shortName": "Resilient infrastructure development"
      },
      {
        "subTargetNumber": "9.2",
        "description": "Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry's share of employment and gross domestic product in line with national circumstances, and double its share in least developed countries",
        "shortName": "Increase industry share"
      },
      {
        "subTargetNumber": "9.3",
        "description": "Increase the access of small-scale industries and other enterprises to financial services, including affordable credit, and their integration into value chains and markets",
        "shortName": "Small-scale industry finance access"
      },
      {
        "subTargetNumber": "9.4",
        "description": "By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes",
        "shortName": "Sustainable industrial upgrades"
      },
      {
        "subTargetNumber": "9.5",
        "description": "Enhance scientific research and industrial technology capabilities of developing countries, including by encouraging innovation and substantially increasing the number of research and development workers and public and private research and development spending",
        "shortName": "Technology capacity strengthening"
      },
      {
        "subTargetNumber": "9.a",
        "description": "Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States",
        "shortName": "Infrastructure development support"
      },
      {
        "subTargetNumber": "9.b",
        "description": "Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities",
        "shortName": "Industrial diversification policies"
      },
      {
        "subTargetNumber": "9.c",
        "description": "Significantly increase access to information and communications technology and provide internet access in least developed countries",
        "shortName": "Universal ICT access"
      }
    ]
  },
  "Reduced inequalities": {
    "sdgNumber": 10,
    "subTargets": [
      {
        "subTargetNumber": "10.1",
        "description": "By 2030, progressively achieve income growth of the bottom 40 per cent of the population at a rate higher than the national average",
        "shortName": "Bottom 40% income growth"
      },
      {
        "subTargetNumber": "10.2",
        "description": "By 2030, promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status",
        "shortName": "Social and economic inclusion"
      },
      {
        "subTargetNumber": "10.3",
        "description": "Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard",
        "shortName": "Reduce inequalities of outcome"
      },
      {
        "subTargetNumber": "10.4",
        "description": "Improve the design and implementation of policies that promote sustainable development",
        "shortName": "Sustainable development policies"
      },
      {
        "subTargetNumber": "10.5",
        "description": "Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations",
        "shortName": "Financial market regulation effectiveness"
      },
      {
        "subTargetNumber": "10.6",
        "description": "Improve international cooperation on financial matters and enhance the domestic resource mobilization for the implementation of national development policies",
        "shortName": "Official development assistance"
      },
      {
        "subTargetNumber": "10.7",
        "description": "Facilitate safe, orderly and regular migration and mobility of people, including through the implementation of planned and well-managed migration policies",
        "shortName": "Safe and orderly migration"
      },
      {
        "subTargetNumber": "10.a",
        "description": "Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements",
        "shortName": "Special differential treatment"
      },
      {
        "subTargetNumber": "10.b",
        "description": "Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes",
        "shortName": "Aid to vulnerable countries"
      },
      {
        "subTargetNumber": "10.c",
        "description": "By 2030, reduce at least to 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent",
        "shortName": "Lower remittance transaction costs"
      }
    ]
  },
  "Sustainable cities & communities": {
    "sdgNumber": 11,
    "subTargets": [
      {
        "subTargetNumber": "11.1",
        "description": "By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums",
        "shortName": "Sustainable housing access"
      },
      {
        "subTargetNumber": "11.2",
        "description": "By 2030, provide safe, affordable and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons",
        "shortName": "Sustainable transport systems"
      },
      {
        "subTargetNumber": "11.3",
        "description": "By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries",
        "shortName": "Participatory urban planning"
      },
      {
        "subTargetNumber": "11.4",
        "description": "Strengthen efforts to protect and safeguard the world's cultural and natural heritage",
        "shortName": "Cultural and natural heritage"
      },
      {
        "subTargetNumber": "11.5",
        "description": "By 2030, significantly reduce the number of deaths and the number of people affected by disasters, and substantially decrease direct economic losses relative to global gross domestic product",
        "shortName": "Reduce disaster impacts"
      },
      {
        "subTargetNumber": "11.6",
        "description": "By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management",
        "shortName": "Improve city air quality"
      },
      {
        "subTargetNumber": "11.7",
        "description": "By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities",
        "shortName": "Public green space access"
      },
      {
        "subTargetNumber": "11.a",
        "description": "Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning",
        "shortName": "Urban-rural integration policies"
      },
      {
        "subTargetNumber": "11.b",
        "description": "By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency and mitigation and adaptation to climate change",
        "shortName": "Integrated resilience plans"
      },
      {
        "subTargetNumber": "11.c",
        "description": "Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials",
        "shortName": "Sustainable and resilient buildings"
      }
    ]
  },
  "Responsible consumption & production": {
    "sdgNumber": 12,
    "subTargets": [
      {
        "subTargetNumber": "12.1",
        "description": "Implement the 10-year framework of programs on sustainable consumption and production in all countries, with developed countries taking the lead, considering the development and capacity-building needs of developing countries.",
        "shortName": "SCP programmes implemented"
      },
      {
        "subTargetNumber": "12.2",
        "description": "By 2030, achieve the sustainable management and efficient use of natural resources",
        "shortName": "Improve resource efficiency"
      },
      {
        "subTargetNumber": "12.3",
        "description": "By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses",
        "shortName": "Reduce food waste"
      },
      {
        "subTargetNumber": "12.4",
        "description": "By 2020, achieve the environmentally sound management of chemicals and all waste and substantially reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment",
        "shortName": "Safe chemical waste management"
      },
      {
        "subTargetNumber": "12.5",
        "description": "By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse",
        "shortName": "Waste generation reduction"
      },
      {
        "subTargetNumber": "12.6",
        "description": "Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle",
        "shortName": "Corporate sustainable practices"
      },
      {
        "subTargetNumber": "12.7",
        "description": "Promote public procurement practices that are sustainable, in accordance with national policies and priorities",
        "shortName": "Sustainable procurement"
      },
      {
        "subTargetNumber": "12.8",
        "description": "By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature",
        "shortName": "Sustainable development awareness"
      },
      {
        "subTargetNumber": "12.a",
        "description": "Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production",
        "shortName": "Technology transfer investment"
      },
      {
        "subTargetNumber": "12.b",
        "description": "Develop and implement tools to monitor the impacts of sustainable tourism on sustainable development",
        "shortName": "Sustainable tourism monitoring"
      },
      {
        "subTargetNumber": "12.c",
        "description": "Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption, taking into account developing countries' specific needs and circumstances",
        "shortName": "Fossil fuel subsidies elimination"
      }
    ]
  },
  "Climate action": {
    "sdgNumber": 13,
    "subTargets": [
      {
        "subTargetNumber": "13.1",
        "description": "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
        "shortName": "Climate resilience capacity"
      },
      {
        "subTargetNumber": "13.2",
        "description": "Integrate climate change mitigation and adaptation into national development policies, strategies and planning",
        "shortName": "National climate adaptation plans"
      },
      {
        "subTargetNumber": "13.3",
        "description": "Improve education and awareness on climate change mitigation, adaptation, impact reduction and early warning",
        "shortName": "Climate education and awareness"
      },
      {
        "subTargetNumber": "13.a",
        "description": "Implement the United Nations Framework Convention on Climate Change on all countries recognizing that the Conference of the Parties is the supreme body of the Convention, and by 2021 adopt a Paris agreement on climate change over the period beyond 2020",
        "shortName": "Climate finance mobilization"
      },
      {
        "subTargetNumber": "13.b",
        "description": "Promote mechanisms for planning and management for responding to climate change in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities",
        "shortName": "Climate action in vulnerable countries"
      }
    ]
  },
  "Life below water": {
    "sdgNumber": 14,
    "subTargets": [
      {
        "subTargetNumber": "14.1",
        "description": "By 2025, prevent and reduce marine pollution from all sources, in particular from land-based activities, including marine debris and nutrient pollution",
        "shortName": "Prevent marine pollution"
      },
      {
        "subTargetNumber": "14.2",
        "description": "By 2020, protect and restore ecosystems that provide essential services, including mangroves, coral reefs and seagrass beds",
        "shortName": "Protect marine ecosystems"
      },
      {
        "subTargetNumber": "14.3",
        "description": "Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels",
        "shortName": "Reduce ocean acidification"
      },
      {
        "subTargetNumber": "14.4",
        "description": "By 2020, effectively regulate harvesting and end overfishing and illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans",
        "shortName": "Sustainable fisheries management"
      },
      {
        "subTargetNumber": "14.5",
        "description": "By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information",
        "shortName": "Marine protected areas"
      },
      {
        "subTargetNumber": "14.6",
        "description": "By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, and eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies",
        "shortName": "Fishery subsidies elimination"
      },
      {
        "subTargetNumber": "14.7",
        "description": "By 2030, increase the economic benefits to small island developing States and least developed countries from the sustainable use of fisheries, including through sustainable management of fisheries, aquaculture and tourism",
        "shortName": "Sustainable fisheries benefits"
      },
      {
        "subTargetNumber": "14.a",
        "description": "Increase scientific knowledge, develop research capacity and transfer marine technology to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries",
        "shortName": "Ocean research and capacity"
      },
      {
        "subTargetNumber": "14.b",
        "description": "Provide access for small-scale fishers to marine resources and markets",
        "shortName": "Small-scale fishers market access"
      },
      {
        "subTargetNumber": "14.c",
        "description": "Enhance the conservation and sustainable use of oceans and their resources by implementing international law, as reflected in UNCLOS, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of \"The Future We Want\"",
        "shortName": "UNCLOS conservation implementation"
      }
    ]
  },
  "Life on land": {
    "sdgNumber": 15,
    "subTargets": [
      {
        "subTargetNumber": "15.1",
        "description": "By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international conventions",
        "shortName": "Terrestrial ecosystem conservation"
      },
      {
        "subTargetNumber": "15.2",
        "description": "By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally",
        "shortName": "Forest protection and reforestation"
      },
      {
        "subTargetNumber": "15.3",
        "description": "By 2030, combat desertification and restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world",
        "shortName": "Land degradation restoration"
      },
      {
        "subTargetNumber": "15.4",
        "description": "By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development",
        "shortName": "Mountain biodiversity conservation"
      },
      {
        "subTargetNumber": "15.5",
        "description": "Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species",
        "shortName": "Threatened species protection"
      },
      {
        "subTargetNumber": "15.6",
        "description": "Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to traditional knowledge associated with them",
        "shortName": "Genetic resources benefit sharing"
      },
      {
        "subTargetNumber": "15.7",
        "description": "Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products",
        "shortName": "End poaching and trafficking"
      },
      {
        "subTargetNumber": "15.8",
        "description": "By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive species on land and water ecosystems and control or eradicate the priority species",
        "shortName": "Invasive species management"
      },
      {
        "subTargetNumber": "15.9",
        "description": "By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts",
        "shortName": "Ecosystem and biodiversity planning"
      },
      {
        "subTargetNumber": "15.a",
        "description": "Mobilize and significantly increase financial resources from all sources to conserve and sustainably use ecosystems and biodiversity",
        "shortName": "Ecosystem conservation finance"
      },
      {
        "subTargetNumber": "15.b",
        "description": "Finance and incentivize sustainable forest management and provide adequate incentives to developing countries to advance sustainable forest management",
        "shortName": "Sustainable forest management"
      },
      {
        "subTargetNumber": "15.c",
        "description": "Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities",
        "shortName": "Anti-poaching operations"
      }
    ]
  },
  "Peace, justice & strong institutions": {
    "sdgNumber": 16,
    "subTargets": [
      {
        "subTargetNumber": "16.1",
        "description": "Reduce all forms of violence and related death rates everywhere",
        "shortName": "Reduce violence everywhere"
      },
      {
        "subTargetNumber": "16.2",
        "description": "End abuse, exploitation, trafficking and all forms of violence against and torture of children",
        "shortName": "Protect children from violence"
      },
      {
        "subTargetNumber": "16.3",
        "description": "Promote the rule of law and equal access to justice for all",
        "shortName": "Rule of law and justice access"
      },
      {
        "subTargetNumber": "16.4",
        "description": "By 2030, reduce illicit financial and arms flows, and strengthen the recovery and return of stolen assets and combat all forms of organized crime",
        "shortName": "Stop illicit arms and financial flows"
      },
      {
        "subTargetNumber": "16.5",
        "description": "Reduce corruption and bribery in all their forms",
        "shortName": "Reduce corruption and bribery"
      },
      {
        "subTargetNumber": "16.6",
        "description": "Develop effective, accountable and transparent institutions at all levels",
        "shortName": "Effective and transparent institutions"
      },
      {
        "subTargetNumber": "16.7",
        "description": "Ensure responsive, inclusive, participatory and representative decision-making at all levels",
        "shortName": "Inclusive decision-making"
      },
      {
        "subTargetNumber": "16.8",
        "description": "Broaden and strengthen the participation of developing countries in the institutions of global governance",
        "shortName": "Global governance participation"
      },
      {
        "subTargetNumber": "16.9",
        "description": "By 2030, provide legal identity for all, including birth registration",
        "shortName": "Legal identity for all"
      },
      {
        "subTargetNumber": "16.10",
        "description": "Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements",
        "shortName": "Public access to information"
      },
      {
        "subTargetNumber": "16.a",
        "description": "Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime",
        "shortName": "Institutional capacity-building support"
      },
      {
        "subTargetNumber": "16.b",
        "description": "Promote and enforce non-discriminatory laws and policies for sustainable development",
        "shortName": "Non-discriminatory laws"
      }
    ]
  },
  "Partnerships for the goals": {
    "sdgNumber": 17,
    "subTargets": [
      {
        "subTargetNumber": "17.1",
        "description": "Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection",
        "shortName": "Domestic resource mobilization"
      },
      {
        "subTargetNumber": "17.2",
        "description": "Ensure that developed countries implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of ODA/GNI to developing countries",
        "shortName": "ODA commitments fulfillment"
      },
      {
        "subTargetNumber": "17.3",
        "description": "Mobilize additional financial resources for developing countries from multiple sources",
        "shortName": "Additional finance mobilized"
      },
      {
        "subTargetNumber": "17.4",
        "description": "Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries",
        "shortName": "Sustainable technology adoptions"
      },
      {
        "subTargetNumber": "17.5",
        "description": "Promote the development and dissemination of environmentally sound technologies to developing countries on concessional and preferential terms, as mutually agreed",
        "shortName": "Capacity-building initiatives"
      },
      {
        "subTargetNumber": "17.6",
        "description": "Ensure the full operationalization of the technology bank and science, technology and innovation capacity-building mechanism for least developed countries",
        "shortName": "Technology bank operationalization"
      },
      {
        "subTargetNumber": "17.7",
        "description": "Promote the development of environmentally sound and socially acceptable technologies for developing countries",
        "shortName": "Environmentally sound technologies"
      },
      {
        "subTargetNumber": "17.8",
        "description": "Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology",
        "shortName": "Technology bank & ICT access"
      },
      {
        "subTargetNumber": "17.9",
        "description": "Enhance international support to implement effective and targeted capacity-building in developing countries to support national plans to implement all the Sustainable Development Goals",
        "shortName": "Capacity-building initiatives"
      },
      {
        "subTargetNumber": "17.10",
        "description": "Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, as the central body, to complement regional and bilateral trade agreements",
        "shortName": "Equitable multilateral trading system"
      },
      {
        "subTargetNumber": "17.11",
        "description": "Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries' share of global exports by 2020",
        "shortName": "Increase LDC export share"
      },
      {
        "subTargetNumber": "17.12",
        "description": "Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries",
        "shortName": "Duty-free market access"
      },
      {
        "subTargetNumber": "17.13",
        "description": "Enhance global macroeconomic stability, including through sound policies and coordinated actions",
        "shortName": "Macroeconomic stability policies"
      },
      {
        "subTargetNumber": "17.14",
        "description": "Enhance policy coherence for sustainable development",
        "shortName": "SDG policy coherence"
      },
      {
        "subTargetNumber": "17.15",
        "description": "Respect each country's policy space and leadership to establish and implement policies for poverty eradication and sustainable development",
        "shortName": "National policy space"
      },
      {
        "subTargetNumber": "17.16",
        "description": "Enhance the global partnership for sustainable development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources",
        "shortName": "Multi-stakeholder partnerships"
      },
      {
        "subTargetNumber": "17.17",
        "description": "Encourage and promote effective public, public-private and private-private partnerships, building on the experience and resourcing strategies of partnerships",
        "shortName": "Effective partnerships"
      },
      {
        "subTargetNumber": "17.18",
        "description": "By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data",
        "shortName": "High-quality SDG data capacity"
      },
      {
        "subTargetNumber": "17.19",
        "description": "By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product",
        "shortName": "SDG progress measurement"
      }
    ]
  }
};

const validBountyTypes = [
    'GHG Removal',
    'Data Science',
    'Learning',
    'Harvesting',
    'Scouting',
    'Code',
    'Design',
    'Volunteer',
    'Regenerate',
    'General',
    'Promotion',
    'Survey',
    'Training',
    'Content',
    'Restoration',
    'Gardening',
    'Validate',
    'Research',
    'Writing',
    'Registration',
    'Community',
    'Recycle',
    'Funding'
];
const supportedBlockchains = [ 'arbitrum', 'base', 'celo', 'optimism', 'optimism sepolia' ];
const blockchainDetails = {
    'arbitrum': {
        image: 'assets/arbitrum.png',
        chainId: 42161
    },
    'base': {
        image: 'assets/base.png',
        chainId: 8453
    },
    'celo': {
        image: 'assets/celo.png',
        chainId: 42220
    },
    'optimism': {
        image: 'assets/optimism.png',
        chainId: 10
    },
    'optimism sepolia': {
        image: 'assets/optimism.png',
        chainId: 11155420
    }
};
const evmAddressRegex = new RegExp('^0x[a-fA-F0-9]{40}$');

/*
    "projectName": "Sample Project",
	"projectStartDate": "2025-09-18T13:40:40",
    "projectEndDate": "2025-09-25T13:40:40",
    "backerName": "Sample Organisation",
    "backerLogo": "https://orgwebsite.org/sample_image.png",
    "projectDescription": "This project was carried out in Bengaluru to promote rainwater harvesting. Over 20000 households setup rainwater harvesting which can potentially lead to 4000000 litres of water being harvested",
    "totalFundsDeployedUSD": 50000,
    "totalImpactPointsAllocated": 2000000,
    "impactCoresAffected": [ "Water", "Earth", "Energy", "Social"],
    "SDGsAffected": [ "zero hunger", "no poverty" ],
    "bountyTypeWisePassAndFailCount": [
        {
            "type": "Design",
            "passCount": 20,
            "failCount": 5
        },
        {
            "type": "Code",
            "passCount": 23,
            "failCount": 2
        }
    ],
    "paymentTransactionBlockchain": "arbitrum",
    "paymentTransactionHash": "0xsomerandomtransactionhash",
    "paymentTokenAddress": "0xSomerandomaddress",
    "mintBlockchain": "optimism sepolia",
    "receiverAddress": "0xsomerandomaddress"
*/
const requestMinting = {
    body: Joi.object().keys({
        projectName: Joi.string().required(),
        projectStartDate: Joi.date().required(),
        projectEndDate: Joi.date().required(),
        backerName: Joi.string().required(),
        backerLogo: Joi.string().uri().required(),
        projectDescription: Joi.string().required(),
        totalFundsDeployedUSD: Joi.number().required(),
        totalImpactPointsAllocated: Joi.number().required(),
        impactCoresAffected: Joi.array().items(Joi.string().valid(...validImpactCores)).min(1).required(),
        SDGsAffected: Joi.array().items(Joi.string().valid(...validSdgs)).min(1).required(),
        bountyTypeWisePassAndFailCount: Joi.array().items(Joi.object().keys({
            type: Joi.string().valid(...validBountyTypes).required(),
            passCount: Joi.number().integer().min(0).required(),
            failCount: Joi.number().integer().min(0).required()
        }).custom((value, helpers) => {
            if (value.passCount === 0 && value.failCount === 0) {
                return helpers.error("a passed bounty type must have at least one submission")
            }
            return value;
        })).min(1).required(),
        paymentTransactionBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        paymentTransactionHash: Joi.string().required(),
        paymentTokenAddress: Joi.string().pattern(evmAddressRegex).required(),
        mintBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        receiverAddress: Joi.string().pattern(evmAddressRegex).required()
    })
};

const requestMintingV2 = {
    body: Joi.object().keys({
        projectName: Joi.string().required(),
        projectStartDate: Joi.date().required(),
        projectEndDate: Joi.date().required(),
        backerName: Joi.string().required(),
        projectDescription: Joi.string().required(),
        totalFundsDeployedUSD: Joi.number().required(),
        impactCoresAffected: Joi.array().items(Joi.string().valid(...validImpactCores)).min(1).required(),
        impactBrief: Joi.object().keys({
            SDG: Joi.string().valid(...validSdgs),
            subTarget: Joi.string().valid(...validSdgSubTargets),
            impactIndicator: Joi.string().required()
        }),
        mediaLinks: Joi.array().items(Joi.string().uri()).min(1).required(),
        paymentTransactionBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        paymentTransactionHash: Joi.string().required(),
        paymentTokenAddress: Joi.string().pattern(evmAddressRegex).required(),
        mintBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        receiverAddress: Joi.string().pattern(evmAddressRegex).required()
    })
};

const fetchMintStatus = {
    query: Joi.object().keys({
        requestId: Joi.string().required()
    })
};

module.exports = {
    requestMinting,
    requestMintingV2,
    fetchMintStatus,
    validImpactCores,
    validSdgs,
    sdgToSubTargets,
    blockchainDetails
};