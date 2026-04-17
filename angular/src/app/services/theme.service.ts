import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'default' | 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'app_theme';
  private readonly DEFAULT_THEME: Theme = 'default';
  private readonly currentTheme = new BehaviorSubject<Theme>(this.getStoredTheme());
  public theme$ = this.currentTheme.asObservable();

  get currentThemeValue(): Theme {
    return this.currentTheme.value;
  }

  constructor() {
    this.applyTheme(this.currentTheme.value);
  }

  /**
   * Get stored theme from sessionStorage or return default
   */
  private getStoredTheme(): Theme {
    const stored = sessionStorage.getItem(this.THEME_STORAGE_KEY);
    if (stored === 'default' || stored === 'light' || stored === 'dark') {
      return stored;
    }
    return this.DEFAULT_THEME;
  }

  /**
   * Set theme and store in sessionStorage
   */
  setTheme(theme: Theme): void {
    sessionStorage.setItem(this.THEME_STORAGE_KEY, theme);
    this.currentTheme.next(theme);
    this.loadThemeStylesheet(theme);
  }

  /**
   * Load theme stylesheet dynamically
   */
  private loadThemeStylesheet(theme: Theme): void {
    const id = 'app-theme';
    let link = document.getElementById(id) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = `assets/themes/theme-${theme}.css`;
  }

  /**
   * Apply theme by setting CSS class on html element
   */
  private applyTheme(theme: Theme): void {
    this.loadThemeStylesheet(theme);
  }

  /**
   * Load and apply theme from sessionStorage
   */
  loadTheme(): void {
    this.applyTheme(this.currentTheme.value);
  }

  /**
   * Get available themes
   */
  getAvailableThemes(): Theme[] {
    return ['default', 'light', 'dark'];
  }

  /**
   * Reset theme to default
   */
  resetTheme(): void {
    this.setTheme(this.DEFAULT_THEME);
  }
}
