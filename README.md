# Creating the content for the README.md file
readme_content = """
# RentCar App - Car Rental & Booking System

RentCar App este o platformă completă pentru închirierea de mașini, care facilitează interacțiunea dintre proprietarii de mașini și clienții care doresc să le închirieze.

## Funcționalități principale:

- **Adăugare mașini de către proprietari**: Utilizatorii care dețin mașini pot crea un cont și adăuga vehiculele proprii în aplicație pentru a fi disponibile spre închiriere. Pot seta detalii precum marca, modelul, prețul pe zi, locația și alte informații relevante despre vehicul.
  
- **Sistem de booking pentru clienți**: Clienții pot naviga prin lista de mașini disponibile, selecta un vehicul și rezerva pentru o anumită perioadă de timp. Există opțiuni pentru a filtra mașinile în funcție de locație, preț sau alte preferințe.

- **Recenzii clienți**: După finalizarea unei închirieri, clienții pot lăsa recenzii și feedback cu privire la experiența lor, ajutând astfel alți utilizatori să ia decizii informate.

- **Management al rezervărilor**: Clienții pot vizualiza rezervările lor active și istoricul acestora, având acces la toate informațiile necesare despre perioada și costul închirierii.

- **Interfață intuitivă**: Aplicația oferă o interfață ușor de utilizat atât pentru proprietarii de mașini, cât și pentru clienți, oferind o experiență plăcută și eficientă de utilizare.

## Cum funcționează:
1. **Pentru proprietari (Owner)**:
    - Creează un cont.
    - Adaugă mașina (cu detalii precum descriere, poze, preț pe zi etc.).
    - Primește cereri de rezervare de la clienți și gestionează disponibilitatea mașinii.

2. **Pentru clienți (Customer)**:
    - Navighează prin mașinile disponibile.
    - Selectează o mașină și rezerv-o pentru datele dorite.
    - După închiriere, oferă un review pentru mașină și experiența generală.

---

### Tehnologii utilizate:
- **Backend**: [Exemplu: Node.js, Django etc.]
- **Frontend**: [Exemplu: React, Vue.js etc.]
- **Bază de date**: [Exemplu: MySQL, MongoDB etc.]

Aplicația este concepută pentru a oferi o experiență sigură și eficientă de închiriere, atât pentru proprietarii de mașini, cât și pentru clienți.
"""

# Saving this content into a README.md file
file_path = "/mnt/data/README.md"
with open(file_path, "w") as file:
    file.write(readme_content)

file_path
