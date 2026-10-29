# slider

Particle **Slider** amélioré pour les templates Gantry 5 (RocketTheme Phoenix).
Improved **Slider** particle for Gantry 5 templates (RocketTheme Phoenix).

[Français](#français) · [English](#english)

---

## Français

### Améliorations

- **Visionneuse (lightbox)** : un clic sur une diapositive affiche son image en grand, avec sa légende (le titre de la diapositive).
- **Navigation** : boutons précédent / suivant, flèches du clavier et balayage sur mobile. La navigation reboucle (après la dernière image, on revient à la première) et affiche un compteur (« 2 / 5 »).
- **Fermeture** : bouton ×, touche Échap ou clic sur le fond sombre.
- Fonctionne avec les images saisies dans le particle et avec les images des articles Joomla (source *Joomla*).
- En mode boucle, les diapositives dupliquées par Swiper n'apparaissent qu'une fois dans la visionneuse.
- Un glisser pour faire défiler le slider n'ouvre pas la visionneuse, et le lien du titre d'une diapositive fonctionne comme avant.
- **Accessibilité** : chaque diapositive a un bouton accessible au clavier, le focus reste dans la visionneuse tant qu'elle est ouverte, et les libellés des boutons sont modifiables.
- Option *Lightbox* (onglet *Settings*) pour activer ou désactiver la visionneuse.

La visionneuse est un script JavaScript sans dépendance (`slider-lightbox.js`), chargé seulement quand l'option est activée.

### Installation

Remplacez `nom_du_template` par le nom de votre template Gantry (par exemple `rt_phoenix`).

> Ces fichiers remplacent ceux d'origine du template : faites-en une copie de sauvegarde avant, et pensez à les recopier après une mise à jour du template.

1. Copiez `slider.html.twig`, `slider-joomla.html.twig` et `slider.yaml` dans le dossier `particles` du template :
   ```
   templates/nom_du_template/particles/
   ```
2. Copiez `_slider.scss` dans le dossier `scss/nom_du_template/particles` du template :
   ```
   templates/nom_du_template/scss/nom_du_template/particles/_slider.scss
   ```
3. Copiez `slider-lightbox.js` dans le dossier `js` du template, à côté de `slider.init.js` :
   ```
   templates/nom_du_template/js/slider-lightbox.js
   ```
4. Videz le cache Gantry (administration Gantry → *Clear Cache*) pour recompiler le CSS, puis le cache Joomla (Système → Vider le cache).

---

## English

### Improvements

- **Lightbox**: clicking a slide shows its image in a larger view, with its caption (the slide title).
- **Navigation**: previous / next buttons, keyboard arrows and swipe on mobile. Navigation wraps around (after the last image comes the first) and shows a counter ("2 / 5").
- **Closing**: × button, Escape key or click on the dark background.
- Works with images set in the particle and with Joomla article images (*Joomla* source).
- In loop mode, slides cloned by Swiper appear only once in the lightbox.
- Dragging the slider does not open the lightbox, and the slide title link works as before.
- **Accessibility**: each slide has a keyboard-reachable button, focus stays inside the open lightbox, and the button labels can be changed.
- *Lightbox* option (*Settings* tab) to turn the lightbox on or off.

The lightbox is a dependency-free JavaScript file (`slider-lightbox.js`), loaded only when the option is on.

### Installation

Replace `template_name` with the name of your Gantry template (for example `rt_phoenix`).

> These files replace the template's original ones: back them up first, and copy them again after a template update.

1. Copy `slider.html.twig`, `slider-joomla.html.twig` and `slider.yaml` into the template's `particles` folder:
   ```
   templates/template_name/particles/
   ```
2. Copy `_slider.scss` into the template's `scss/template_name/particles` folder:
   ```
   templates/template_name/scss/template_name/particles/_slider.scss
   ```
3. Copy `slider-lightbox.js` into the template's `js` folder, next to `slider.init.js`:
   ```
   templates/template_name/js/slider-lightbox.js
   ```
4. Clear the Gantry cache (Gantry admin → *Clear Cache*) to recompile the CSS, then the Joomla cache (System → Clear Cache).
