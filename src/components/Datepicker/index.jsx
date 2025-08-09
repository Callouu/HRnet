import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

/**
 * DatePicker - Composant de sélection de date
 *
 * Props :
 * @param {string} name - Nom du champ (pour le formulaire)
 * @param {string} value - Valeur ISO de la date sélectionnée (ex: "2025-08-06")
 * @param {function} onChange - Fonction appelée lors de la sélection d'une date
 * @param {string} [placeholder] - Texte affiché si aucune date sélectionnée
 */
function DatePicker({ name, value, onChange, required, ariaInvalid, placeholder = "Select a date" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Ferme le calendrier si on clique en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Date affichée dans le calendrier
  const [currentDate, setCurrentDate] = useState(() =>
    value ? new Date(value) : new Date()
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calcul du nombre de jours dans le mois et du premier jour de la semaine
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();


  // Génère une date locale
  const localeDate = (date) =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  // Sélectionne un jour et ferme le calendrier
  const handleDate = (day) => {
    const selected = new Date(year, month, day);
    onChange({ target: { name, value: localeDate(selected) } });
    setOpen(false);
  };

  // Navigation mois précédent/suivant
  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

  // Liste des années pour le select (1970 à 2070)
  const years = Array.from({ length: 101 }, (_, i) => 1970 + i);

  const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

  return (
    <div className="custom-datepicker" ref={ref}>
      {/* Bouton d'ouverture du calendrier */}
      <button
        type="button"
        className="custom-datepicker__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-invalid={ariaInvalid}
        aria-required={required ? "true" : "false"}
      >
        <span>
          {value ? new Date(value).toLocaleDateString("fr-FR") : placeholder}
        </span>
        <span className="custom-datepicker__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {/* Calendrier déroulant */}
      {open && (
        <div className="custom-datepicker__popup">
          <div className="custom-datepicker__header">
            {/* Mois précédent */}
            <button type="button" onClick={handlePrev}>&lt;</button>
            <span>
              {/* Dropdown pour le mois */}
            <select
              className="custom-datepicker__month-select"
              value={month}
              onChange={e =>
                setCurrentDate(new Date(year, Number(e.target.value), 1))
              }
            >
              {months.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
              {/* Affichage du mois et select de l'année */}
              <select
                className="custom-datepicker__year-select"
                value={year}
                onChange={(e) =>
                  setCurrentDate(new Date(Number(e.target.value), month, 1))
                }
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </span>
            {/* Mois suivant */}
            <button type="button" onClick={handleNext}>&gt;</button>
          </div>
          <div className="custom-datepicker__calendar">
            {/* Jours de la semaine */}
            <div className="custom-datepicker__weekdays">
              {["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"].map((d) => (
                <div key={d} className="custom-datepicker__weekday">{d}</div>
              ))}
            </div>
            {/* Jours du mois */}
            <div className="custom-datepicker__days">
              {/* Cases vides avant le premier jour du mois */}
              {[...Array(firstDay).keys()].map((_, i) => (
                <div key={`empty-${i}`} className="custom-datepicker__day empty"></div>
              ))}
              {/* Affichage des jours */}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const iso = localeDate(new Date(year, month, day));
                return (
                  <div
                    key={day}
                    className={`custom-datepicker__day${value === iso ? " selected" : ""}`}
                    onClick={() => handleDate(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;