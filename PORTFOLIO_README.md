# Modern Portfolio - Md Saiful Islam

A beautiful, modern, and responsive one-page portfolio website showcasing software engineering experience and AI research work.

## Features

### Design
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Scroll animations, typing effects, and interactive elements
- **Color Scheme**: Professional gradient color scheme with primary purple/indigo theme
- **Bilingual**: Full English and German language support with toggle button

### Sections

1. **Hero Section**
   - Animated typing effect showing multiple roles
   - Call-to-action buttons (Contact & Download CV)
   - Social media links
   - Animated background with particles

2. **About Section**
   - Professional introduction
   - Key statistics (experience, publications, problem-solving)
   - Education timeline with visual cards

3. **Software Engineering Experience**
   - Timeline view of work experience
   - Company details, responsibilities, and tech stack
   - Three positions: Shikho Technologies, AHOM Limited, SmartBridge

4. **AI Research & Publications**
   - Separate section highlighting research work
   - Two publications with details and tags
   - Focus on AI, IoT, and Blockchain research

5. **Skills & Technologies**
   - Organized by categories (Programming, Tools, Databases)
   - Interactive hover effects
   - Icons for each technology

6. **Projects**
   - Featured projects with descriptions
   - Tech stack tags
   - Links to source code

7. **Achievements**
   - Hackathon awards with medal badges
   - Problem-solving achievements
   - Community contributions

8. **Contact Section**
   - Email, phone, and location details
   - Social media cards
   - Email copy-to-clipboard functionality

### Interactive Features

- **Typing Animation**: Cycles through different roles/titles
- **Language Toggle**: Switch between English and German with one click
- **Smooth Scroll**: Navigate smoothly between sections
- **Active Navigation**: Highlights current section in navbar
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Particle Animation**: Floating particles in hero section
- **Scroll Animations**: Elements fade in as you scroll
- **Counter Animation**: Statistics animate when in view
- **Back to Top**: Button appears when scrolling down
- **Hover Effects**: Interactive cards and buttons
- **Language Persistence**: Remembers your language preference

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Vanilla JS for all interactions
- **Font Awesome**: Icon library
- **Google Fonts**: Inter and Space Grotesk fonts

## File Structure

```
MyPortfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript for interactivity
├── translations.js     # English and German translations
└── Md_Saiful_Islam_Resume_v6 (1).pdf  # CV file
```

## Language Support

The portfolio supports both English and German languages:

- **EN/DE Toggle**: Located in the top navigation bar
- **Auto-Save**: Language preference is saved in localStorage
- **Complete Translation**: All content is translated including:
  - Navigation menu
  - All section titles and descriptions
  - Experience details
  - Publications
  - Achievements
  - Contact information

### Adding or Modifying Translations

Edit the `translations.js` file to modify or add new translations. The structure is:

```javascript
translations = {
    en: { /* English translations */ },
    de: { /* German translations */ }
}
```

## Usage

1. **View the Portfolio**:
   - Simply open `index.html` in any modern web browser
   - Or use a local server for best experience

2. **Customize Content**:
   - Edit `index.html` to update content
   - Modify `styles.css` to change colors/styling
   - Update `script.js` to add/modify interactions

3. **Deploy**:
   - Upload all files to any web hosting service
   - Works with GitHub Pages, Netlify, Vercel, etc.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Performance

- Fast loading time
- Optimized animations
- Minimal dependencies
- No external libraries except fonts and icons

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... more colors */
}
```

### Add University Logos

To add custom university logos:

1. **For TU Dortmund**: Already includes the official logo
2. **For Jagannath University**:
   - Save your logo as `jnu-logo.png` in the root folder
   - Update the HTML in the education section:
   ```html
   <div class="edu-icon edu-icon-img">
       <img src="jnu-logo.png" alt="Jagannath University">
   </div>
   ```

### Modify Content
- **Static content**: Edit `index.html`
- **Translations**: Edit `translations.js`
- **Interactions**: Edit `script.js`

### Add Sections
Follow the existing section structure in HTML and add corresponding styles in CSS

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Skip to content link

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Blog section
- [ ] Contact form with backend
- [ ] PWA support
- [ ] Multi-language support
- [ ] Custom cursor

## Credits

**Design & Development**: Portfolio created based on CV content
**Icons**: Font Awesome
**Fonts**: Google Fonts (Inter, Space Grotesk)

## License

Personal portfolio - all rights reserved to Md Saiful Islam

---

**Last Updated**: February 2026
**Contact**: saiful.cse98@gmail.com
