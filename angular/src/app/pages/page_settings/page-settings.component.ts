import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss'],
  standalone: false
})
export class PageSettingsComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'default';
  availableThemes: Theme[] = [];
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Get current theme
    this.currentTheme = this.themeService.currentThemeValue;
    
    // Subscribe to theme changes
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.currentTheme = theme;
      });

    // Get available themes
    this.availableThemes = this.themeService.getAvailableThemes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Change theme and save to sessionStorage
   */
  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  /**
   * Get theme display name
   */
  getThemeName(theme: Theme): string {
    const names: { [key in Theme]: string } = {
      default: 'Par Défaut (Violet)',
      light: 'Clair',
      dark: 'Sombre'
    };
    return names[theme];
  }

  /**
   * Get theme description
   */
  getThemeDescription(theme: Theme): string {
    const descriptions: { [key in Theme]: string } = {
      default: 'Thème original avec dégradé violet',
      light: 'Thème clair et lumineux, parfait pour le jour',
      dark: 'Thème sombre, reposant pour les yeux'
    };
    return descriptions[theme];
  }
}
