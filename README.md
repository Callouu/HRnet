# HRnet

Une application React pour la gestion du personnel, visant à moderniser une ancienne application en jQuery (via un plugin) en une application React, maintenable et performante.

---

## 1. Architecture Technique

- **React**
- **Redux**
- **redux-persist**
- **React Router**
- **SCSS**
- **JSDoc**

---

## 2. Prérequis

- Node.js (version recommandée ≥ 14)
- npm ou yarn

---

## 3. Installation & Lancement

```bash
# Cloner le dépôt
git clone https://github.com/Callouu/HRnet.git
cd HRnet

# Installer les dépendances
npm install
# ou
yarn install

# Lancer en mode développement
npm dev
# ou
yarn dev
```

---

## 4. Arborescence du projet

```text
HRnet/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Composants réutilisables (Form, Modal, Table, etc.)
│   ├── pages/             # Pages principales (CreateEmployee, EmployeeList…)
│   ├── store/             # Fichiers de configuration Redux
│   └── data/              # Données JSON pour les états et départements
├── docs/                  # Documentation JSDoc
├── .gitignore
├── package.json
└── README.md
```

---

## 5. Fonctionnalités

- Création d’employés via un formulaire.
- Affichage sous forme de liste/tableau, avec options **de tri**, **recherche** et **pagination**.
- Sauvegarde automatique des données dans `localStorage`, avec rechargement après refresh.
- Navigation entre les pages (React Router).

---

## 6. Documentation Technique

- Utilisation de **JSDoc**
- La documentation finale est disponible dans le dossier `docs/` (ouvrir `docs/index.html`).

---

## 7. Tests Unitaires

L’application inclut des tests unitaires pour garantir la fiabilité et éviter les régressions lors de modifications.

**Stack de tests :**
- **Jest** — framework de tests JavaScript.
- **React Testing Library** — pour tester les composants React en simulant un rendu proche de l’utilisation réelle.

**Commandes disponibles :**
```bash
# Lancer tous les tests
npm test

# Lancer un test spécifique
npm test -- <nom_du_fichier>

# Lancer un test de couverture
npx jest --coverage
```
