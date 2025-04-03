import { css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class QuestionElement extends LitElement {
  static styles = css`
    .game-page {
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid rgba(44, 62, 80, 0.2);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      min-height: 300px;
      padding: 15px;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }

    .game-page:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }

    .game-header {
      border-bottom: 2px solid var(--jetlag-accent);
      margin-bottom: 15px;
      padding-bottom: 10px;
      text-align: center;
    }

    .game-title {
      color: var(--jetlag-dark);
      font-size: 1.6em;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .game-info {
      align-items: center;
      color: var(--jetlag-secondary);
      display: flex;
      font-weight: 600;
      gap: 10px;
      justify-content: center;
      margin-bottom: 15px;
    }

    .game-info span {
      background-color: rgba(231, 76, 60, 0.1);
      border-bottom: 2px solid var(--jetlag-accent);
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      color: var(--jetlag-primary);
      font-weight: 700;
      padding: 3px 8px;
    }

    .game-question {
      background-color: rgba(52, 152, 219, 0.05);
      border-radius: 4px;
      color: var(--jetlag-text);
      font-size: 1.1em;
      line-height: 1.6;
      margin-bottom: 20px;
      padding: 10px;
      text-align: center;
    }

    .game-question span.light {
      background-color: rgba(52, 152, 219, 0.1);
      border-bottom: 1px solid var(--jetlag-accent);
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      color: var(--jetlag-secondary);
      font-weight: 500;
      padding: 2px 6px;
    }

    .game-question span.heavy {
      background-color: rgba(231, 76, 60, 0.15);
      border-bottom: 1px solid var(--jetlag-accent);
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      color: var(--jetlag-primary);
      font-weight: 500;
      padding: 2px 6px;
    }

    .category {
      border-radius: 20px;
      color: var(--jetlag-dark);
      font-size: 0.85em;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
      padding: 4px 10px;
    }

    .category-title {
      color: var(--jetlag-secondary);
      display: block;
      font-size: 0.9em;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .category-title span {
      font-weight: 500;
      color: var(--jetlag-primary);
      background-color: rgba(231, 76, 60, 0.15);
      padding: 2px 6px;
      border-radius: 4px;
      border-bottom: 1px solid var(--jetlag-accent);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  `;
}
