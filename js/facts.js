/**
 * The NYC Compass - Curated NYC Facts & Secrets Database
 * Categories: 'all', 'underground', 'engineering', 'food-lore', 'history'
 */

const NYC_FACTS = [
  {
    id: 1,
    title: "The Secret 1904 City Hall Subway Station",
    category: "underground",
    categoryLabel: "Subway Secrets",
    icon: "train",
    teaser: "There is an untouched, chandelier-lit subway palace buried beneath City Hall.",
    fact: "Opened on October 27, 1904 as the ceremonial showpiece of NYC's inaugural subway line, the Old City Hall station features vaulted ceilings by Spanish master Rafael Guastavino, Romanesque brass chandeliers, and stained-glass skylights. Closed in 1945 because new, longer train cars could not safely navigate its tight curve, it still exists intact! You can view it today by simply staying on the downtown 6 train after its final stop at Brooklyn Bridge-City Hall as it loops around the track to head uptown.",
    didYouKnow: "The station was so ornate it originally had oak ticket booths and brass chandeliers."
  },
  {
    id: 2,
    title: "Central Park Required More Gunpowder Than The Battle of Gettysburg",
    category: "engineering",
    categoryLabel: "Engineering Wonders",
    icon: "mountain",
    teaser: "Central Park looks wild and natural, but every inch of it was engineered.",
    fact: "Frederick Law Olmsted and Calvert Vaux designed Central Park in 1858 so masterfully that visitors assume its hills, lakes, and meadows are natural. In reality, nearly 5 million cubic yards of stone, earth, and topsoil were moved. Workers detonated over 260 tons of black gunpowder to blast through stubborn Manhattan schist bedrock—substantially more gunpowder than was fired during the entire three-day Battle of Gettysburg in the Civil War.",
    didYouKnow: "Over 4 million trees, shrubs, and vines representing 1,400 species were manually planted."
  },
  {
    id: 3,
    title: "The Acoustic Anomaly of Grand Central's Whispering Gallery",
    category: "underground",
    categoryLabel: "Acoustic Secrets",
    icon: "volume-2",
    teaser: "Two people can whisper into opposite diagonal corners 50 feet apart and hear each other crystal-clear.",
    fact: "Directly outside the Grand Central Oyster Bar on the lower concourse, four curved ceramic Guastavino tile archways form an uncanny acoustic phenomenon called a Whispering Gallery. If you stand facing the wall in one corner and a friend stands facing the corner diagonally across 50 feet of crowded concourse, your softest whisper travels directly along the parabolic curve of the ceiling straight into their ear!",
    didYouKnow: "Legend has it that jazz icon Charles Mingus used this acoustic archway to propose marriage to his wife."
  },
  {
    id: 4,
    title: "The Secret Behind NYC's Legendary Bagels and Pizza Crust",
    category: "food-lore",
    categoryLabel: "Food Lore",
    icon: "pizza",
    teaser: "Why can't other cities replicate NYC pizza and bagel dough? The secret is in the tap water.",
    fact: "New York City tap water is famously heralded as the 'Champagne of Tap Water'. Originating in pristine, protected mountain reservoirs in the Catskills and Delaware watersheds up to 125 miles upstate, it travels entirely by gravity through gigantic deep-rock aqueducts without requiring artificial filtration. The water has an exceptionally low concentration of calcium and magnesium (ultra-soft water). This ideal mineral balance strengthens gluten in yeast dough, yielding bagels that are uniquely chewy inside with a blistered crust, and pizza crust that stays crisp yet flexible.",
    didYouKnow: "Some New York pizzerias that open branches in Florida and California actually ship gallons of NYC tap water across the country to maintain crust consistency."
  },
  {
    id: 5,
    title: "Lightning Strikes the Empire State Building ~25 Times Every Year",
    category: "engineering",
    categoryLabel: "Engineering Wonders",
    icon: "zap",
    teaser: "The Empire State Building functions as a giant natural lightning rod for the entire city.",
    fact: "Soaring 1,454 feet into the sky, the Empire State Building's stainless steel and aluminum spire acts as an intentional lightning rod. During severe summer thunderstorms, it absorbs an average of 25 direct lightning strikes each year (and has been struck as many as 8 times in a single 24-minute span!). The building is engineered with heavy copper grounding cables that safely channel millions of volts harmlessly into the bedrock beneath Manhattan.",
    didYouKnow: "The mooring mast atop the spire was originally designed to dock transatlantic passenger zeppelins and dirigibles, though high winds proved it too hazardous."
  },
  {
    id: 6,
    title: "More Than 800 Languages are Spoken in NYC (World Record)",
    category: "history",
    categoryLabel: "Cultural Demographics",
    icon: "globe",
    teaser: "NYC is documented as the most linguistically diverse urban area in human history.",
    fact: "Linguists from the Endangered Language Alliance (ELA) have mapped more than 800 distinct languages and dialects spoken across New York City—particularly concentrated along the 7 train corridor in Queens. Many of these languages, such as Seke (from Nepal), Vurës (from Vanuatu), and rare indigenous Mesoamerican tongues like Mixtec and Nahuatl, have more fluent speakers in Queens and Brooklyn than in their ancestral homelands.",
    didYouKnow: "Over 37% of NYC's current population was born in another country."
  },
  {
    id: 7,
    title: "Track 61: The Secret Presidential Platform Beneath The Waldorf Astoria",
    category: "underground",
    categoryLabel: "Subway Secrets",
    icon: "shield",
    teaser: "President Franklin D. Roosevelt had an armored subterranean train track and elevator.",
    fact: "Buried beneath Grand Central and connected directly to the basement of The Waldorf Astoria hotel lies 'Track 61'—a private subterranean siding and armored elevator platform. During WWII, President Franklin D. Roosevelt used this secret platform so his customized armored train car could roll directly underneath the hotel, allowing him to enter via an elevator directly into the presidential suite without the public or press seeing his wheelchair.",
    didYouKnow: "Andy Warhol hosted an underground party on this secret track in 1965."
  },
  {
    id: 8,
    title: "The Federal Reserve Vault Holds 25% of the World's Monetary Gold",
    category: "history",
    categoryLabel: "Underground Fortresses",
    icon: "coins",
    teaser: "Five stories beneath Wall Street sits the largest accumulation of gold in human history.",
    fact: "Resting on the solid bedrock of Manhattan 80 feet below street level and 50 feet below sea level, the Federal Reserve Bank of New York on Liberty Street safeguards roughly 507,000 gold bars weighing over 6,300 metric tons. That represents roughly 25% of the entire world's official monetary gold reserves. The vault is enclosed by a 90-ton rotating steel cylinder that forms an airtight and watertight seal.",
    didYouKnow: "Gold deposits belong to 36 foreign central banks and international monetary organizations; the US government stores its own reserves primarily at Fort Knox."
  },
  {
    id: 9,
    title: "Cleopatra's Needle: A 3,500-Year-Old Egyptian Obelisk in Central Park",
    category: "history",
    categoryLabel: "Ancient History",
    icon: "landmark",
    teaser: "There is an authentic monument in Central Park that is older than the Roman Empire.",
    fact: "Erected in Central Park behind The Met in 1881, the 71-foot red granite obelisk known as 'Cleopatra's Needle' was originally carved from the quarries of Aswan in Egypt around 1450 BCE for Pharaoh Thutmose III—making it over 3,500 years old. Transporting the 220-ton monolith across the Atlantic Ocean on a custom steamship and rolling it on cannons and wooden rollers through Manhattan streets took over four months.",
    didYouKnow: "A time capsule buried underneath the obelisk contains an 1880 US census, the Bible, a dictionary, the complete works of Shakespeare, and a box of cigars."
  },
  {
    id: 10,
    title: "The Yellow Taxi Medallion Once Cost More Than \$1 Million",
    category: "history",
    categoryLabel: "NYC Icons",
    icon: "car",
    teaser: "A tiny metal plate on the hood of a NYC yellow cab was once one of the most lucrative assets in America.",
    fact: "In 1937, NYC Mayor Fiorello LaGuardia signed the Haas Act, capping the number of official yellow taxi licenses (medallions) to prevent predatory competition. Because the number of medallions was legally limited to roughly 13,000 while the city grew exponentially, medallion values skyrocketed: in 2013, an individual medallion sold at auction for an astronomical \$1.32 million, before ride-sharing apps disrupted the industry.",
    didYouKnow: "Cabs are painted yellow because in 1907, John Hertz read a University of Chicago study proving yellow was the most visible color from a distance."
  }
];
