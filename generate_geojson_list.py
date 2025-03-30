import os

# Dossier où se trouvent les fichiers GeoJSON
data_folder = "data"
output_file = "geojsonFiles.js"

# Récupère tous les fichiers .geojson dans le dossier
geojson_files = [
    f"'{data_folder}/{file}'"
    for file in os.listdir(data_folder)
    if file.endswith(".geojson")
]

# Crée le contenu JavaScript
js_content = "const geojsonFiles = [\n  " + ",\n  ".join(geojson_files) + "\n];"

# Écrit dans le fichier JS
with open(output_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"{output_file} généré avec {len(geojson_files)} fichiers GeoJSON.")
