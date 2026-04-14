# FinanceTracker - Modern SaaS Finance App

A professional, modern SaaS finance tracker built with React, TypeScript, and Tailwind CSS. Manage your money with powerful analytics, budgeting tools, and a beautiful user interface.

## Features

### 🏠 Landing Page
- Professional hero section
- Feature showcase with icons
- Pricing plans (Free, Pro, Business)
- Call-to-action flows
- Responsive design across all devices

### 🔐 Authentication
- Login/Signup pages with form validation
- Email & password authentication
- Demo account for testing (`demo@financetracker.com`)
- LocalStorage-based session persistence
- Protected routes for dashboard access

### 💼 Dashboard
- Clean, modern dashboard layout with sidebar navigation
- Full-width responsive design (laptop/mobile/tablet)
- Dark mode support with theme toggle

### 📊 Financial Management
- **Dashboard Summary Cards** - Total Income, Expenses, Current Balance
- **14-Day Cashflow Graph** - Visualize net cashflow trends
- **Spending by Category Chart** - Bar chart breakdown
- **Expense Calendar** - Monthly heatmap of daily expenses
- **Recent Transactions** - Last 5 transactions with details
- **Monthly Budget Tracking** - Set and monitor monthly limits with alerts

### 💳 Transaction Management
- **Add Transactions** - Income/Expense with category, amount, date
- **Transaction List** - Full list with type/category filters
- **Delete Transactions** - Remove any transaction
- **Categories** - Food, Transport, Bills, Salary, Entertainment, Shopping, Health, Other

### 🎨 Modern UI/UX
- Professional color palette (Purple/Indigo primary)
- Smooth animations and transitions
- Glassmorphism cards and surfaces
- Responsive grid layouts
- Hover effects and micro-interactions
- Dark mode support throughout

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v6
- **State Management**: React Context API + Hooks
- **Data Persistence**: LocalStorage
- **Charts**: Native SVG graphs (no external chart library)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TransactionList.jsx
│   │   ├── TransactionItem.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── CategoryChart.jsx
│   │   ├── CalendarChart.jsx
│   │   └── LineTrendChart.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AddTransaction.jsx
│   │   └── Transactions.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.html
```

## Running Locally

### Install Dependencies
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## Authentication Flow

1. **Landing Page** - Browse features and pricing
2. **Sign Up** - Create new account (email, password, name)
3. **Login** - Authenticate with credentials
4. **Demo Login** - Try with demo account immediately
5. **Protected Dashboard** - Full app access after login

## Data Management

- **LocalStorage Keys**:
  - `ft_user` - Current authenticated user
  - `finance_tracker_transactions_v1` - All transactions
  - `finance_tracker_budget_v1` - Monthly budget setting
  - `finance_tracker_theme_v1` - Dark mode preference

- **Mock Data** - App initializes with sample transactions for demo purposes

## Customization

### Update Colors
Edit the primary color palette in `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#7c3aed', // Change this to your brand color
    // ...
  },
}
```

### Modify Layout
- Sidebar width: adjust `w-64` or `xl:w-72` in `DashboardLayout.jsx`
- Dashboard grids: change breakpoints like `xl:grid-cols-2`

### Add New Features
- Create new pages in `src/pages/`
- Add routes in `src/App.jsx`
- Use existing components as templates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Backend API integration
- [ ] Real user authentication (OAuth, JWT)
- [ ] Database persistence
- [ ] Recurring transactions
- [ ] Multiple accounts/wallets
- [ ] Export reports (PDF/CSV)
- [ ] Mobile app version
- [ ] Advanced analytics & insights
- [ ] Team collaboration features

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

