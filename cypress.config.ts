import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    // 'baseUrl': 'http://localhost:4200',
    
      "reporter": "mochawesome",
      "reporterOptions": {
        "reportDir": "cypress/reports/mocha",
        "overwrite": false,
        "html": false,
        "json": true
      }
    
    
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})

