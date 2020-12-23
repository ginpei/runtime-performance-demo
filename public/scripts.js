// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { html, render } from "https://unpkg.com/lit-html?module";
// eslint-disable-next-line import/extensions
import { manyPosts } from "./data.js";

/**
 * @typedef {{
 *   items: Message[];
 *   message: string;
 * }} HomePageProps
 */

/**
 * @typedef {{
 *   id: string;
 *   liked: boolean;
 *   message: string;
 * }} Message
 */

// ----------------------------------------------------------------

/** @type {HomePageProps} */
let state = {
  items: manyPosts.map((v) => createMessage(v)),
  message: "Hello World!",
};

main();

// ----------------------------------------------------------------

function main() {
  update(state);
}

/**
 * @param {Partial<HomePageProps>} updatedState
 */
function update(updatedState) {
  state = { ...state, ...updatedState };
  render(HomePage(state), document.getElementById("app"));
}

/**
 * @param {HomePageProps} props
 */
function HomePage(props) {
  return html`
    <div class="HomePage">
      <div class="Timeline">
        <div>
          <h1>Tweeeeeeeen</h1>
        </div>
        ${MessageForm()} ${props.items.map((item) => Message(item))}
      </div>
    </div>
  `;
}

function MessageForm() {
  /** @type {(event: Event) => void} */
  const onSubmit = (event) => {
    event.preventDefault();
    // const elForm = event.currentTarget;
    // if (!elForm || !(elForm instanceof HTMLFormElement)) {
    //   return;
    // }

    // const data = new FormData(elForm);
    // /** @type {Message} */
    // const item = createItem({
    //   message: String(data.get("message") || ""),
    // });
    // if (!item.message) {
    //   return;
    // }

    // update({
    //   items: [item, ...state.items],
    // });

    // elForm.reset();
  };

  return html`
    <form @submit=${onSubmit} class="PostForm">
      <textarea class="PostForm-text" name="message"></textarea>
      <div class="util-text-right">
        <button class="PostForm-submit">Post</button>
      </div>
    </form>
  `;
}

/**
 * @param {Message} item
 */
function Message(item) {
  return html`
    <section class="Message">
      <div class="Message-message">${item.message}</div>
      <div class="Message-starContainer">${TwinkleStar(item)}</div>
    </section>
  `;
}

/**
 * @param {Message} item
 */
function TwinkleStar(item) {
  const onClick = () => {
    update({
      items: state.items.map((arrayItem) => {
        if (arrayItem.id !== item.id) {
          return arrayItem;
        }

        return {
          ...item,
          liked: !item.liked,
        };
      }),
    });
  };

  return html`
    <button @click=${onClick} class="TwinkleStar" data-liked=${item.liked}>
      <span class="TwinkleStar-scale">
        <span class="TwinkleStar-rotate">${item.liked ? "★" : "☆"}</span>
      </span>
    </button>
  `;
}

/**
 * @param {Partial<Message>} initial
 * @returns {Message}
 */
function createMessage(initial) {
  return {
    id: generateId(),
    liked: false,
    message: "",
    ...initial,
  };
}

function generateId() {
  return Math.random().toFixed(34).slice(2);
}
