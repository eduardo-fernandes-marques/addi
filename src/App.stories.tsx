import App from './App';

export const AppComponent = () => <App />;

export default {
  parameters: {
    component: AppComponent,
    componentSubtitle: 'Example of <AppComponent /> component',
  },
  title: 'App',
};

AppComponent.story = {
  parameters: {
    docs: {
      storyDescription: 'App component',
    },
  },
};
