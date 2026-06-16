# AquaRead — Irrigation Need Predictor
https://aquaread.netlify.app/

A small browser-based tool that takes field conditions and tells you whether your crop needs low, medium, or high irrigation. 
<img width="1278" height="430" alt="image" src="https://github.com/user-attachments/assets/4b468733-e443-45c1-a2c3-797620fa362a" />

---

## What it does

You enter a handful of things you already know about your field — soil type, current moisture, crop, growth stage, recent rainfall, temperature. The tool sends those to the trained model, which reasons over patterns from the training dataset and comes back with:

- A prediction: **Low**, **Medium**, or **High** irrigation need
- A confidence breakdown across the three levels
- A plain-language explanation of *why* it landed where it did
- One practical thing you can do right now
<img width="462" height="399" alt="image" src="https://github.com/user-attachments/assets/89fe8895-2fbc-4642-ba6a-345030e40166" />

---

## The dataset

`irrigation_prediction.csv` — 10,000 records of real agricultural field conditions with the following columns:

| Column | What it means |
|---|---|
| Soil_Type | Clay, Loamy, Sandy, or Silt |
| Soil_Moisture | Current moisture reading (%) |
| Temperature_C | Air temperature (°C) |
| Humidity | Relative humidity (%) |
| Rainfall_mm | Rainfall over the past ~30 days |
| Previous_Irrigation_mm | How much was applied last time |
| Crop_Type | Cotton, Maize, Potato, Rice, Sugarcane, Wheat |
| Crop_Growth_Stage | Sowing → Vegetative → Flowering → Harvest |
| Season | Kharif (monsoon), Rabi (winter), Zaid (summer) |
| Irrigation_Need | **Target label** — Low / Medium / High |

The label distribution is unbalanced: ~59% Low, ~38% Medium, ~3% High. High irrigation need is genuinely rare in the data, mostly showing up when moisture is low *and* rainfall is low *and* temperatures are high simultaneously.

Not every column in the dataset is used — Electrical_Conductivity, Organic_Carbon, Wind_Speed, Field_Area, Mulching_Used, Water_Source, Region, and Irrigation_Type were left out because the key drivers of irrigation need come through clearly from the subset that is used.

<img width="228" height="496" alt="image" src="https://github.com/user-attachments/assets/97d15d7a-f173-46fb-97c0-2429b6660bb9" />
---

## How to run it

1. Open `website` in any modern browser (Chrome, Firefox, Safari — whatever you have)
2. Adjust the sliders and dropdowns to match your field
3. Click **Predict Irrigation Need**
4. View the answer

That's it. No npm install, no build step, no server.
<img width="1271" height="292" alt="image" src="https://github.com/user-attachments/assets/cb8a985f-a2bf-4cd9-8b07-7aa7dea06de8" />


---


## Design decisions

The UI is deliberately minimal — no charts-for-the-sake-of-charts, no dashboard overload. The confidence bar chart earns its place because "Low: 72%" is genuinely more useful than just "Low." Everything else is there to help you fill in the form quickly and understand the result.

Color palette was chosen to feel like the subject matter: deep forest green (`#2d5a3d`) for structure, straw gold (`#c9a84c`) for warmth and accents, muted sage for positive/low states, terracotta for high-need warnings. The typeface pairing is Literata (a reading-optimized serif, used for headings) with Plus Jakarta Sans (clean, slightly warm grotesque for UI) and DM Mono for numbers and labels.
<img width="1277" height="653" alt="image" src="https://github.com/user-attachments/assets/92dd6457-2378-4bec-8c54-cbcd04fc0a7f" />

---

## Extending it

To make it more useful for farmers, I plan to:

- Add GPS-based weather lookup so rainfall and temperature fill in automatically
- Add a history log (localStorage) so user can track predictions over the season

---

## Credit
This project was built with the support of AI tools, which helped speed up the design of the HTML structure and assisted in developing most of the JavaScript logic. AI was used as a coding companion to generate ideas, debug issues, and optimize parts of the implementation, while the final decisions, customization, and overall direction of the project remained guided by the developer.

---
## Files

```
irrigation-predictor/
├── index.html          ← the design (html)
├── script.js           ← the code (java script)
└── README.md           ← this
```


*Know before you water.
Save what the soil already has.*
