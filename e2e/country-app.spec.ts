import { test, expect } from '@playwright/test';

test.describe('Country App', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the sign-in page directly
    await page.goto('http://localhost:3000/auth/signin', { timeout: 60000 });
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Fill in the form with username and password
    await page.getByLabel(/username/i).fill('User');
    await page.getByLabel(/password/i).fill('password');
    
    // Click sign in and wait for navigation
    const signInButton = page.getByRole('button', { name: /signin/i });
    await signInButton.click();
    
    // Wait for redirect to home page after successful sign in
    await page.waitForURL('http://localhost:3000', { timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });

  test('should display countries list and search functionality', async ({ page }) => {
    // Wait for loading state to finish
    await page.waitForSelector('.grid > div', { state: 'visible', timeout: 60000 });
    
    // Check if search input is present
    const searchInput = page.getByPlaceholder('Search for a country...');
    await expect(searchInput).toBeVisible();

    // Check if countries are loaded
    const countryCards = page.locator('.grid > div');
    const count = await countryCards.count();
    expect(count).toBeGreaterThan(0);

    // Test search functionality
    await searchInput.fill('France');
    await page.waitForTimeout(500); // Wait for search debounce
    await expect(countryCards).toHaveCount(1);
    await expect(page.getByText('France')).toBeVisible();
  });

  test('should navigate to country details', async ({ page }) => {
    // Wait for loading state to finish
    await page.waitForSelector('.grid > div', { state: 'visible', timeout: 60000 });
    
    // Click on the first country card
    const firstCountryCard = page.locator('.grid > div').first();
    const countryName = await firstCountryCard.locator('h2').textContent();
    await firstCountryCard.click();

    // Check if we're on the country details page
    await expect(page).toHaveURL(/\/country\/[A-Z]{3}/);
    await expect(page.getByText(countryName!)).toBeVisible();
  });

  test('should handle dark mode toggle', async ({ page }) => {
    // Wait for loading state to finish
    await page.waitForSelector('.grid > div', { state: 'visible', timeout: 60000 });
    
    // Check initial theme
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    // Toggle dark mode
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();

    // Check if dark mode is applied
    await expect(html).toHaveClass(/dark/);
  });

  test('should navigate to compare page', async ({ page }) => {
    // Wait for loading state to finish
    await page.waitForSelector('.grid > div', { state: 'visible', timeout: 60000 });
    
    // Click on compare link in the header
    await page.getByRole('link', { name: /compare/i }).click();

    // Check if we're on the compare page
    await expect(page).toHaveURL('/compare');
    await expect(page.getByRole('heading', { name: 'Compare Dashboard' })).toBeVisible();
  });

  test('should handle country comparison', async ({ page }) => {
    // Navigate to compare page
    await page.goto('http://localhost:3000/compare', { timeout: 60000 });
    
    // Wait for the page to load
    await page.waitForSelector('input[type="text"]', { timeout: 60000 });

    // Select countries to compare
    const inputs = page.locator('input[type="text"]');
    await inputs.first().fill('France');
    await inputs.nth(1).fill('Germany');

    // Click compare button
    await page.getByRole('button', { name: /compare/i }).click();

    // Wait for comparison to load
    await page.waitForTimeout(500);

    // Check if comparison is displayed
    await expect(page.getByText('France')).toBeVisible();
    await expect(page.getByText('Germany')).toBeVisible();
  });
}); 