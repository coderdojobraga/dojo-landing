import { getSiteSettings } from "@/lib/settings";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  const settings = getSiteSettings();
  const enabledItems = settings.navItems.filter((item) => item.enabled);

  return <NavbarClient items={enabledItems} />;
}
