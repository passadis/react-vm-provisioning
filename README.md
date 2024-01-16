<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=azure,react,nodejs,js,html,css,terraform,vscode" />
  </a>
</p>

<h1 align="center">Azure VM Provisioning Web App with appoval Workflow</h1>


## Introduction
Managing VM provisioning in Azure can be a complex task for administrators, balancing compliance, security, and efficiency. Our solution simplifies this process with a Web App that automates VM provisioning requests, integrates approval workflows, and ensures control over VM specifics.

## Features
- **Entra ID Authentication**: Secure user authentication for request submission.
- **Custom VM Options**: Users can select VM size, operating system, name, and region.
- **Azure SQL Database**: Stores each request with enabled Change Tracking.
- **Azure Logic Apps Workflow**: Automates approval process and executes tasks based on approval status and provisioning status.
- **Notification System**: Informs users about the approval status of their requests.

## Tools and Technologies
- **Frontend**: React-based user interface.
- **Backend**: Express JS, hosted in Docker containers on Azure Container Apps.
- **Database**: Azure SQL for request storage.
- **Security and Compliance**: Azure Key Vault and Managed Identity.
- **Workflow Automation**: Azure Logic Apps for managing the provisioning process with API requests .

## Conclusion
This Web App not only enhances administrative efficiency but also provides scalability to extend its capabilities to other resources and operational needs. Experience streamlined VM provisioning with our solution, tailored for Azure administrators and users.

## Instructions
**Follow the Blog for Detailed Instructions**: For step-by-step guidance, visit [React Web App with Azure Container Apps, Azure SQL and Logic Apps approval flow](https://www.cloudblogger.eu/2024/01/14/azure-vm-auto-provisioning-web-app-with-logic-apps-approval-workflow/).

## Contribution
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository, make your changes, and submit a pull request.

## Architecture
![vmprov-app](https://github.com/passadis/react-vm-provisioning/assets/53148138/90a38a90-3d36-4980-82b2-7bc3e2293053)
