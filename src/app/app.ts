import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'star-wars-app';

  ngOnInit() {
    // Vanta.js
    (window as any).VANTA.STARS({
      el: "#starry-bg",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0x90918,
      color: 0xffff88
    });

    // Animação do "crawl"
    const scrollSection = document.querySelector('.star-wars-scroll-section');
    const crawlContent = document.getElementById('crawl-content');
    
    if (scrollSection && crawlContent) {
      scrollSection.addEventListener('scroll', () => {
        const rect = scrollSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          crawlContent.style.display = 'block';
          (window as any).anime({
            targets: crawlContent,
            translateY: ['100%', '-100%'],
            duration: 100000,
            easing: 'linear'
          });
        }
      });
    }
  }
}
