import { render, unmountComponentAtNode } from 'react-dom';

export function unmountRender(element: React.ReactElement, container: Element) {
  unmountComponentAtNode(container);
  render(element, container);
}
