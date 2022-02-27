# SRC Folder
This folder consists of
```
📦src
 ┣ 📂component 
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📜app-calendar.tsx
 ┃ ┃ ┣ 📜app-card.tsx
 ┃ ┃ ┣ 📜app-link.tsx
 ┃ ┃ ┣ 📜app-table-footer.tsx
 ┃ ┃ ┣ 📜app-table.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂app-charts
 ┃ ┃ ┣ 📜barchart.tsx
 ┃ ┃ ┣ 📜canvas.tsx
 ┃ ┃ ┣ 📜donutchart.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂audit
 ┃ ┃ ┣ 📜audit-detail.tsx
 ┃ ┃ ┣ 📜audit-export.tsx
 ┃ ┃ ┣ 📜audit-search.tsx
 ┃ ┃ ┗ 📜audit-table.tsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜login-form.tsx
 ┃ ┃ ┗ 📜register-form.tsx
 ┃ ┣ 📂channels-monitoring
 ┃ ┃ ┣ 📜channels-monitoring-search..tsx
 ┃ ┃ ┣ 📜channels-monitoring-stats.tsx
 ┃ ┃ ┣ 📜channels-monitoring-table.tsx
 ┃ ┃ ┣ 📜channels-monitoring-tabs.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂custom-component
 ┃ ┃ ┣ 📜image-background.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜isw-logo.tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📜dashboard.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜service-status.tsx
 ┃ ┃ ┣ 📜success-rate.tsx
 ┃ ┃ ┣ 📜terminals-performance.tsx
 ┃ ┃ ┣ 📜terminals-under-watch.tsx
 ┃ ┃ ┣ 📜top-performing-banks.tsx
 ┃ ┃ ┣ 📜top-transaction-metric.tsx
 ┃ ┃ ┣ 📜transaction-breakdown.tsx
 ┃ ┃ ┣ 📜transaction-metric.tsx
 ┃ ┃ ┗ 📜usage-metric.tsx
 ┃ ┣ 📂framer
 ┃ ┃ ┣ 📜motion-box.tsx
 ┃ ┃ ┣ 📜motion-button.tsx
 ┃ ┃ ┗ 📜motion-flex.tsx
 ┃ ┣ 📂interchange-disconnection
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜interchange-connection-request-table.tsx
 ┃ ┃ ┣ 📜interchange-disconnection-app-bar.tsx
 ┃ ┃ ┣ 📜interchange-disconnection-status-table.tsx
 ┃ ┃ ┣ 📜interchange-disconnection-table.tsx
 ┃ ┃ ┣ 📜interchange-disconnection-tabs.tsx
 ┃ ┃ ┗ 📜request-connection-modal.tsx
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📜authenticated.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜non-authenticated.tsx
 ┃ ┃ ┣ 📜onboarding.tsx
 ┃ ┃ ┗ 📜onboardning-nav.tsx
 ┃ ┣ 📂onboarding
 ┃ ┃ ┣ 📜creat-super-admin-with-existing-passport-account.tsx
 ┃ ┃ ┣ 📜creat-super-admin-without-existing-passport-account.tsx
 ┃ ┃ ┣ 📜create-bank.tsx
 ┃ ┃ ┣ 📜create-super-admin.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜institution-colors.tsx
 ┃ ┃ ┣ 📜onboarding-card.tsx
 ┃ ┃ ┣ 📜signin-with-passport.tsx
 ┃ ┃ ┗ 📜success-card.tsx
 ┃ ┣ 📂stats
 ┃ ┃ ┣ 📜app-bar-filter.tsx
 ┃ ┃ ┣ 📜custom-filter.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜institution-filter.tsx
 ┃ ┃ ┣ 📜search-filters.tsx
 ┃ ┃ ┣ 📜search-text.tsx
 ┃ ┃ ┗ 📜stat.tsx
 ┃ ┣ 📂user-management
 ┃ ┃ ┣ 📜add-new-bank.tsx
 ┃ ┃ ┣ 📜add-new-user.tsx
 ┃ ┃ ┣ 📜bank-admin.tsx
 ┃ ┃ ┣ 📜bank.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜isw-admin.tsx
 ┃ ┃ ┣ 📜user-management-search.tsx
 ┃ ┃ ┣ 📜user-management-stats.tsx
 ┃ ┃ ┣ 📜user-management-tab-and-search.tsx
 ┃ ┃ ┗ 📜user-management.tsx
 ┃ ┣ 📜container.tsx
 ┃ ┣ 📜font.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜mission-statement.tsx
 ┃ ┗ 📜skeleton-loader.tsx
 ┣ 📂constants
 ┃ ┣ 📜app-filter.ts
 ┃ ┣ 📜app-table.ts
 ┃ ┣ 📜audit.ts
 ┃ ┣ 📜authenticated-pages.ts
 ┃ ┣ 📜browser-storage.ts
 ┃ ┣ 📜cross-domain.ts
 ┃ ┣ 📜env-constants.ts
 ┃ ┣ 📜grant-types.ts
 ┃ ┣ 📜icon-constants.tsx
 ┃ ┣ 📜image-constants.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜links.ts
 ┃ ┣ 📜menu-names.ts
 ┃ ┣ 📜methods.ts
 ┃ ┣ 📜modals.ts
 ┃ ┣ 📜months.ts
 ┃ ┣ 📜names.ts
 ┃ ┣ 📜notification-mesages.ts
 ┃ ┣ 📜roles.ts
 ┃ ┣ 📜states.ts
 ┃ ┣ 📜stats.ts
 ┃ ┣ 📜tabs.ts
 ┃ ┗ 📜tenants.ts
 ┣ 📂hooks
 ┃ ┣ 📜audit.ts
 ┃ ┣ 📜authentication.ts
 ┃ ┣ 📜channels-monitoring.ts
 ┃ ┣ 📜cross-domain-onboarding.ts
 ┃ ┣ 📜filter.ts
 ┃ ┣ 📜forms.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜interchange-disconnection.ts
 ┃ ┣ 📜loading.ts
 ┃ ┣ 📜onboarding.ts
 ┃ ┣ 📜pagination.ts
 ┃ ┗ 📜validatoin.ts
 ┣ 📂lib
 ┃ ┣ 📜cookie.ts
 ┃ ┣ 📜functions.ts
 ┃ ┗ 📜index.ts
 ┣ 📂models
 ┃ ┣ 📜api-response.ts
 ┃ ┣ 📜audit.ts
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜button-spinner.ts
 ┃ ┣ 📜channels-monitoring.ts
 ┃ ┣ 📜component-props-model.ts
 ┃ ┣ 📜form.ts
 ┃ ┣ 📜general.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜interchange-disconnection.ts
 ┃ ┣ 📜onboarding.ts
 ┃ ┣ 📜pagination.ts
 ┃ ┣ 📜stats-models.ts
 ┃ ┣ 📜user-management.ts
 ┃ ┗ 📜validation.ts
 ┣ 📂provider
 ┃ ┣ 📜audit-provider.tsx
 ┃ ┣ 📜auth-provider.tsx
 ┃ ┣ 📜channels-monitoring-provider.tsx
 ┃ ┣ 📜cross-domain-onboarding-provider.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜interchange-disconnection-provider.tsx
 ┃ ┣ 📜onboarding-provider.tsx
 ┃ ┣ 📜paginator-provider.tsx
 ┃ ┣ 📜stats-provider.tsx
 ┃ ┗ 📜user-management-tab-provider.tsx
 ┣ 📂services
 ┃ ┗ 📂v1
 ┃ ┃ ┣ 📜create-account.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜interchange.ts
 ┣ 📂styles
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜Home.module.css
 ┣ 📂theme
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜button.ts
 ┃ ┃ ┣ 📜image-background.tsx
 ┃ ┃ ┣ 📜input.ts
 ┃ ┃ ┣ 📜isw-logo.ts
 ┃ ┃ ┣ 📜link.ts
 ┃ ┃ ┣ 📜login-form.ts
 ┃ ┃ ┣ 📜select.ts
 ┃ ┃ ┣ 📜tag.ts
 ┃ ┃ ┗ 📜text.ts
 ┃ ┣ 📂foundations
 ┃ ┃ ┗ 📜colors.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜style.ts
 ┗ 📜readme.md

```