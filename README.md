# The NYC Compass — The Definitive New York City Guide 🗽

A modern, responsive, and interactive editorial web application exploring the greatest culinary spots, iconic attractions, electric nightlife, 400 years of Wikipedia-grounded cultural heritage, and fascinating secrets of New York City across all 5 boroughs.

---

## 🌟 Key Features

1. **🍕 Best Places to Eat**:
   - Iconic NYC Delis & Institutions: *Katz's Delicatessen*, *Russ & Daughters*, *Peter Luger Steak House*.
   - The Pizza Pilgrimage: *Joe's Pizza* (Greenwich Village), *Lucali* (Carroll Gardens, Brooklyn), *Lee's Tavern* (Staten Island bar pie).
   - Global Gastronomy across the Boroughs: *Nom Wah Tea Parlor* (Chinatown), *New World Mall & Flushing* (Queens), *Jackson Heights Himalayan Hub* (Queens), *Roberto's on Arthur Avenue* (The Bronx).
   - Bakeries & Street Bites: *Levain Bakery* (Upper West Side), *Los Tacos No. 1* (Chelsea Market).

2. **🏛️ Best Places to Visit & Sights**:
   - World Landmarks: *Central Park*, *The Met (Metropolitan Museum of Art)*, *Summit One Vanderbilt*, *Brooklyn Bridge & DUMBO*, *Statue of Liberty & Ellis Island*.
   - Modern Wonders & Memorials: *The High Line & Little Island*, *9/11 Memorial & Oculus*, *Grand Central Terminal*, *The Tenement Museum*, *Flushing Meadows Corona Park & The Unisphere*, *Yankee Stadium*, *Snug Harbor & Chinese Scholar's Garden*.

3. **🍸 Electric Nightlife**:
   - Historic Jazz & Comedy: *The Comedy Cellar*, *Village Vanguard*, *Blue Note Jazz Club*.
   - Hidden Speakeasies: *PDT (Please Don't Tell - phone booth entrance)*, *The Dead Rabbit (World's Best Bar winner)*.
   - High-Altitude & Dance: *Westlight at The William Vale* (Williamsburg rooftop), *House of Yes* (Bushwick circus/club), *Broadway & The Theater District*.

4. **📖 Wikipedia-Grounded Cultural Deep Dive**:
   - **Chronological 400-Year Timeline**: *Lenapehoking* -> *New Amsterdam (1624)* -> *Revolution & 1st US Capital (1789)* -> *1811 Grid & 1898 Great Consolidation* -> *Harlem Renaissance & Skyscraper Race* -> *Modern Metropolis*.
   - **The Five Boroughs Profiles**: Detailed demographic, character, and cultural breakdown of Manhattan, Brooklyn, Queens, The Bronx, and Staten Island.
   - **Architectural Movement Guide**: Cast-iron facades in SoHo, Gilded Age Beaux-Arts, Art Deco spires, Mid-century International Style, and contemporary supertalls.

5. **💡 Mind-Blowing NYC Facts & Secrets**:
   - Secret 1904 City Hall Subway Station (with Rafael Guastavino tile vaults).
   - The acoustic physics behind Grand Central's Whispering Gallery.
   - The Catskills gravity-fed water system secret behind NYC bagels and pizza crust.
   - Why Central Park required more black gunpowder than the entire Battle of Gettysburg.
   - The Federal Reserve underground gold vault holding 25% of the world's monetary gold.
   - Interactive "Surprise Me!" trivia shuffler.

6. **🗺️ Interactive Itinerary Builder ("My NYC Plan")**:
   - Bookmark any venue to save it to your local plan (persists in `localStorage`).
   - Slide-over itinerary drawer with ordered stops, quick removal, and one-click **Print / Save PDF** export.

---

## 🚀 How to Launch the Website

You don't need any server, Node.js, or Python. It runs directly in any web browser!

### Option 1 (Double-Click):
Double-click `open_nyc_guide.bat` inside this directory:
```
C:\Users\Guillermo\.gemini\antigravity\scratch\nyc-guide\open_nyc_guide.bat
```

### Option 2 (Browser File URL):
Open Google Chrome, Microsoft Edge, or Firefox and paste:
```
file:///C:/Users/Guillermo/.gemini/antigravity/scratch/nyc-guide/index.html
```

---

## 📁 Project Architecture

```
nyc-guide/
├── index.html              # Core single-page application structure
├── open_nyc_guide.bat      # 1-click Windows launcher
├── README.md               # Documentation and guides
├── css/
│   └── styles.css          # Subway line bullet colors, glassmorphism, fonts & animations
└── js/
    ├── data.js             # Curated database of dining, sights & nightlife venues
    ├── culture.js          # Wikipedia-grounded historical timeline, boroughs & architecture
    ├── facts.js            # Mind-blowing trivia vault with interactive categories
    └── app.js              # Application logic: filtering, search, modal views & itinerary
```
