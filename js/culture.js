/**
 * The NYC Compass - Cultural & Historical Deep-Dive
 * Grounded in Wikipedia historical archives and New York City records.
 */

const NYC_CULTURE = {
  overview: {
    title: "New York City: The World's Cultural Melting Pot",
    subtitle: "A global hub of commerce, arts, diplomacy, and relentless human reinvention.",
    summary: "According to historical records and Wikipedia archives, New York City is the most densely populated major city in the United States and one of the world's most influential cultural and financial capitals. Composed of five boroughs consolidated in 1898, it is home to over 8.3 million residents speaking more than 800 languages, making it the most linguistically diverse urban area on Earth.",
    wikipediaLink: "https://en.wikipedia.org/wiki/New_York_City",
    quickStats: [
      { label: "Population", value: "8.33 Million", icon: "users" },
      { label: "Boroughs", value: "5 Distinct Boroughs", icon: "map" },
      { label: "Languages Spoken", value: "800+ Dialects", icon: "globe" },
      { label: "Restaurants & Bars", value: "27,000+", icon: "utensils" },
      { label: "Parkland", value: "30,000+ Acres", icon: "trees" },
      { label: "Subway Stations", value: "472 (World #1)", icon: "train" }
    ]
  },

  eras: [
    {
      era: "Pre-1624",
      title: "Lenapehoking: The Indigenous Roots",
      badge: "Ancestral Homeland",
      description: "Long before European ships dropped anchor in New York Harbor, the archipelago was inhabited by the Lenape Native Americans, specifically the Munsee-speaking bands. They called their land Lenapehoking and the island 'Manahatta' ('island of many hills'). The ancient Lenape trade route through the dense hickory and oak forests was known as the Wickquasgeck trail—the exact winding pathway that survives today as Broadway.",
      highlights: [
        "The name 'Manhattan' derives from the Munsee Delaware word 'Manahatta'",
        "Broadway follows the indigenous Wickquasgeck hunting and trade trail",
        "Oyster reefs were so vast they contained roughly half of the world's oyster population"
      ]
    },
    {
      era: "1624 – 1664",
      title: "New Amsterdam: Dutch Fur Trading Post",
      badge: "Dutch Foundations",
      description: "In 1624, the Dutch West India Company established New Amsterdam at the southern tip of Manhattan as a commercial fur-trading post. In 1626, Director-General Peter Minuit famously negotiated with local indigenous leaders for the island. The Dutch brought concepts of religious tolerance, free trade, and pluralism that still define the city's character. In 1653, settlers built a 12-foot wooden palisade wall to protect against raids—giving birth to Wall Street.",
      highlights: [
        "Wall Street was named after the physical defensive wooden wall erected in 1653",
        "Canal Street was an open drainage canal that once drained the freshwater Collect Pond",
        "Peter Stuyvesant surrendered the colony to the British Crown in 1664, who renamed it New York"
      ]
    },
    {
      era: "1776 – 1789",
      title: "Revolution & The First Capital of the United States",
      badge: "Birth of the Nation",
      description: "During the American Revolutionary War, New York was the site of the pivotal Battle of Brooklyn (1776), the largest battle of the entire war. The British occupied the city until Evacuation Day in 1783. In 1785, New York was named the official national capital of the newly founded United States. On April 30, 1789, George Washington stood on the balcony of Federal Hall on Wall Street and took the oath of office as the nation's first President.",
      highlights: [
        "George Washington was inaugurated as 1st US President at Federal Hall on Wall Street",
        "The United States Bill of Rights was drafted and ratified at Federal Hall in 1789",
        "Alexander Hamilton founded the Bank of New York (1784) and the New York Post (1801)"
      ]
    },
    {
      era: "1811 – 1898",
      title: "The Grid, The Great Migration & The 1898 Consolidation",
      badge: "Metropolis Emerges",
      description: "In 1811, the visionary Commissioners' Grid Plan laid out the rectangular street and avenue grid for Manhattan above Houston Street. The 1825 opening of the Erie Canal connected NYC to the Great Lakes, transforming it into the unrivaled commercial gateway of North America. Massive waves of Irish, German, Italian, and Eastern European Jewish immigrants passed through Castle Garden and Ellis Island. On January 1, 1898, the historic Consolidation Charter merged Manhattan with the independent City of Brooklyn, Queens County, Richmond (Staten Island), and The Bronx to form modern Greater New York.",
      highlights: [
        "The 1811 Grid Plan designed 12 avenues and 155 numbered cross-streets",
        "Brooklyn was the 3rd largest independent city in America prior to the 1898 merger",
        "The opening of the Brooklyn Bridge in 1883 physically and symbolically united the cities"
      ]
    },
    {
      era: "1920s – 1950s",
      title: "Harlem Renaissance, Jazz Age & Skyscraper Wars",
      badge: "Golden Age of Culture",
      description: "The 1920s witnessed the Harlem Renaissance, an extraordinary flowering of African American literature, poetry, jazz, and visual art led by Langston Hughes, Zora Neale Hurston, Duke Ellington, and Louis Armstrong. Simultaneously, Midtown and Lower Manhattan engaged in the legendary 'Race into the Sky', producing architectural marvels including the Chrysler Building (1930) and the Empire State Building (1931). Following WWII, the United Nations chose New York as its permanent world headquarters in 1951.",
      highlights: [
        "The Apollo Theater in Harlem became the launchpad for Ella Fitzgerald and Billie Holiday",
        "The Empire State Building was completed in an astonishing 1 year and 45 days",
        "New York supplanted Paris as the capital of the international modern art world (Abstract Expressionism)"
      ]
    },
    {
      era: "1970s – Present",
      title: "Resilience, Global Innovation & Cultural Renaissance",
      badge: "Modern World Capital",
      description: "Overcoming severe fiscal crises in the 1970s—a decade that paradoxically birthed Hip-Hop in the South Bronx and Punk Rock at CBGB in the Bowery—New York reinvented itself. In the 21st century, the city demonstrated profound global resilience following the September 11, 2001 attacks, rebuilding the World Trade Center with One WTC and transforming disused industrial zones into world-renowned parks like the High Line and Brooklyn Bridge Park.",
      highlights: [
        "Hip-Hop was officially born on August 11, 1973 at 1520 Sedgwick Avenue in the Bronx",
        "One World Trade Center stands at a symbolic 1,776 feet tall",
        "NYC welcomes over 65 million international and domestic visitors each year"
      ]
    }
  ],

  boroughs: [
    {
      name: "Manhattan",
      county: "New York County",
      nickname: "The City / Gotham",
      population: "1.63 Million",
      area: "22.8 sq mi",
      character: "The beating economic, theatrical, and cultural epicenter. Manhattan boasts the world's most recognizable skyline, Wall Street, Broadway, Central Park, and famed neighborhoods ranging from historic Greenwich Village brownstones to the soaring glass needles of Midtown.",
      iconicSpots: ["Central Park", "Times Square", "Empire State Building", "The Met", "SoHo"],
      vibe: "High-voltage, architectural, walkable, relentless 24/7 energy."
    },
    {
      name: "Brooklyn",
      county: "Kings County",
      nickname: "Kings County / The Borough of Homes & Churches",
      population: "2.60 Million",
      area: "70.8 sq mi",
      character: "If Brooklyn were an independent city, it would be the fourth-most populous in the United States. Renowned worldwide for its historic 19th-century brownstone neighborhoods (Brooklyn Heights, Park Slope), vibrant indie music scene, artisanal dining, and Prospect Park.",
      iconicSpots: ["Brooklyn Bridge & DUMBO", "Williamsburg", "Prospect Park", "Coney Island Boardwalk", "Bushwick Murals"],
      vibe: "Creative, artisanal, historic, community-centered, culturally vibrant."
    },
    {
      name: "Queens",
      county: "Queens County",
      nickname: "The World's Borough",
      population: "2.28 Million",
      area: "108.5 sq mi",
      character: "Officially documented by Guinness World Records as the most ethnically diverse urban area on the planet. Home to residents from over 150 nations, Queens is an incomparable culinary odyssey: Greek tavernas in Astoria, authentic dim sum in Flushing, Colombian and Himalayan stalls in Jackson Heights.",
      iconicSpots: ["Flushing Meadows-Corona Park", "MoMA PS1", "Astoria Seafood & Beer Gardens", "Gantry Plaza State Park", "Rockaway Beach"],
      vibe: "Multicultural, authentic, sprawling, food lover's paradise, unpretentious."
    },
    {
      name: "The Bronx",
      county: "Bronx County",
      nickname: "The Boogie Down Bronx",
      population: "1.38 Million",
      area: "42.1 sq mi",
      character: "The legendary birthplace of Hip-Hop music and culture, and the only NYC borough physically attached to the North American mainland. Rich in green space (over 25% parkland), home to the 27-time World Series champion New York Yankees, the renowned Bronx Zoo, and Arthur Avenue's authentic Italian enclaves.",
      iconicSpots: ["Yankee Stadium", "Arthur Avenue (Real Little Italy)", "The New York Botanical Garden", "The Bronx Zoo", "Wave Hill Public Garden"],
      vibe: "Passionate, historic, rich in musical roots, green, proud."
    },
    {
      name: "Staten Island",
      county: "Richmond County",
      nickname: "The Borough of Parks",
      population: "495,000",
      area: "58.5 sq mi",
      character: "The most suburban of the five boroughs, Staten Island is connected to Manhattan via the iconic 24/7 free Staten Island Ferry. Known for the 2,800-acre contiguous Greenbelt forest preserve, historic 17th-century Richmond Town, and stunning harbor views looking back toward Lower Manhattan.",
      iconicSpots: ["Staten Island Ferry", "Snug Harbor Cultural Center", "The Greenbelt Nature Center", "Historic Richmond Town", "Fort Wadsworth"],
      vibe: "Tranquil, maritime, historic, wooded, family-oriented."
    }
  ],

  architecture: [
    {
      style: "Cast-Iron Architecture",
      period: "1850s – 1880s",
      iconicExample: "SoHo Cast-Iron Historic District (500+ buildings)",
      description: "Prefabricated ornamental iron facades allowed massive floor-to-ceiling windows and ornate neoclassical detail at a fraction of the cost of carved stone. SoHo holds the greatest concentration of cast-iron buildings in the world."
    },
    {
      style: "Beaux-Arts Classical",
      period: "1890s – 1920s",
      iconicExample: "Grand Central Terminal, New York Public Library, The Met",
      description: "Symmetrical, opulent classical grandeur characterized by Tennessee marble, Corinthian columns, grand vaulted concourses, and lavish decorative sculptures celebrating civic dignity."
    },
    {
      style: "Art Deco Masterpieces",
      period: "1925 – 1940",
      iconicExample: "Chrysler Building, Empire State Building, Rockefeller Center",
      description: "Soaring geometric stepped setbacks (mandated by the 1916 Zoning Resolution to allow sunlight onto streets), sunburst motifs, polished chrome-nickel steel spires, and reliefs honoring modern industrial machine age."
    },
    {
      style: "International Style & Mid-Century Modern",
      period: "1950s – 1970s",
      iconicExample: "Seagram Building (Mies van der Rohe), Lever House",
      description: "Sleek, bronze-tinted glass curtain walls, bronze mullions, and public plazas that eliminated ornamental detail in pursuit of structural minimalism and pure corporate elegance."
    },
    {
      style: "Contemporary Supertalls & Parametric Design",
      period: "2010s – Present",
      iconicExample: "Summit One Vanderbilt, 111 W 57th St (world's slenderest skyscraper)",
      description: "Hyper-slender supertall towers engineered with massive tuned mass dampers to counter high-altitude jetstream winds, crystalline reflective glass facades, and cantilevered public observatories."
    }
  ]
};
