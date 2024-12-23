import { useActionState } from "react";
import { useOpinions } from "../store/opinions-context";

import  Submit  from "./Submit";

export function NewOpinion() {
  const { addOpinion } = useOpinions();

  const shareOpinionAction = async (prevFromState, formData) => {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!userName.trim()) {
      errors.push("Please enter your name");
    }

    if (title.trim().length < 5) {
      errors.push("Please enter a title with at least 5 characters");
    }

    if (body.trim().length < 10 || body.trim().length > 500) {
      errors.push("Please enter your opinion between 10 and 500 characters");
    }

    if (errors.length > 0) {
      return {
        errors,
        data: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({
      userName,
      title,
      body,
    });

    return {
      errors: null,
    };
  };

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.data?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.data?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.data?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <div className="errors">
            <ul>
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
       <Submit />
      </form>
    </div>
  );
}
