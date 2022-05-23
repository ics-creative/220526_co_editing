import Quill from "quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css"

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

  window.addEventListener("blur", () => {
    quill.blur();
  });
};

init()
