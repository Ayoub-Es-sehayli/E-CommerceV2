import "bootstrap-icons/font/bootstrap-icons.css";
import "tailwindcss/tailwind.css";
import { Card } from "../components/content";

export const CardTemplate = () => {
  return (
    <div className="grid justify-center gap-4">
      <Card name="Card Title" category="Card tag" price="110" />
    </div>
  );
};
