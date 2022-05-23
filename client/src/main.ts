import Quill from "quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";

Quill.register("modules/cursors", QuillCursors);

const parent = document.querySelector("#editor");

const init = () => {
  if (!parent) {
    return;
  }
  const quill = new Quill(parent, {
    modules: {
      cursors: true,
      toolbar: [
        // adding some basic Quill content features
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
      history: {
        // Local undo shouldn't undo changes
        // from remote users
        userOnly: true,
      },
    },
    placeholder: "Start collaborating...",
    theme: "snow", // 'bubble' is also great
  });

  const doc = new Y.Doc();
  const wsProvider = new WebsocketProvider(
    "ws://localhost:1234",
    "my-room-name",
    doc
  );
  wsProvider.on("status", (event: { status: string }) => {
    console.log(event.status);
  });

  // Define a shared text type on the document
  const ytext = doc.getText("quill");

  // "Bind" the quill editor to a Yjs text type.
  new QuillBinding(ytext, quill, wsProvider.awareness);

  window.addEventListener("blur", () => {
    quill.blur();
  });
};

init();
