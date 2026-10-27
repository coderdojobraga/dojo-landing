import fs from "fs";
import path from "path";

export const NOTION_CURRICULUM_URL =
  "https://coderdojobraga.notion.site/Renova-o-do-Curr-culo-592035160b3f4b259d896fe15014fc7a?p=de8c1062cc074a228aa363616f974e4c&pm=c";

export interface NavItemSetting {
  id: string;
  label: string;
  path: string;
  enabled: boolean;
}

export interface SiteSettings {
  navItems: NavItemSetting[];
  curriculumDestination: "internal" | "notion";
  notionCurriculumUrl: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  navItems: [
    {
      id: "curriculum",
      label: "Currículo",
      path: "/curriculum",
      enabled: true,
    },
    {
      id: "recruitment",
      label: "Recrutamento",
      path: "/recruitment",
      enabled: true,
    },
    { id: "team", label: "Equipa", path: "/team", enabled: true },
    { id: "faqs", label: "Faqs", path: "/faqs", enabled: true },
  ],
  curriculumDestination: "internal",
  notionCurriculumUrl: NOTION_CURRICULUM_URL,
};

const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "settings.json");

/**
 * Retrieve current site settings from data/settings.json.
 * If file does not exist, defaults are created and returned.
 */
export function getSiteSettings(): SiteSettings {
  try {
    if (!fs.existsSync(SETTINGS_FILE_PATH)) {
      saveSiteSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }

    const fileContent = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (parsed && Array.isArray(parsed.navItems)) {
      const curriculumDestination =
        parsed.curriculumDestination === "notion" ? "notion" : "internal";
      const notionCurriculumUrl =
        parsed.notionCurriculumUrl || NOTION_CURRICULUM_URL;

      const navItems = parsed.navItems.map((item: NavItemSetting) => {
        if (item.id === "curriculum") {
          return {
            ...item,
            path:
              curriculumDestination === "notion"
                ? notionCurriculumUrl
                : "/curriculum",
          };
        }
        return item;
      });

      return {
        ...parsed,
        navItems,
        curriculumDestination,
        notionCurriculumUrl,
      };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Failed to read settings.json:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Persist site settings to data/settings.json.
 */
export function saveSiteSettings(settings: SiteSettings): void {
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      SETTINGS_FILE_PATH,
      JSON.stringify(settings, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Failed to save settings.json:", error);
    throw new Error("Não foi possível gravar as configurações.");
  }
}

/**
 * Toggle a specific navigation item's enabled state.
 */
export function updateNavItem(id: string, enabled: boolean): SiteSettings {
  const currentSettings = getSiteSettings();
  const updatedNavItems = currentSettings.navItems.map((item) => {
    if (item.id === id) {
      return { ...item, enabled };
    }
    return item;
  });

  const newSettings: SiteSettings = {
    ...currentSettings,
    navItems: updatedNavItems,
  };

  saveSiteSettings(newSettings);
  return newSettings;
}

/**
 * Update the curriculum destination ("internal" | "notion").
 */
export function updateCurriculumDestination(
  destination: "internal" | "notion",
  customUrl?: string,
): SiteSettings {
  const currentSettings = getSiteSettings();
  const notionUrl =
    customUrl || currentSettings.notionCurriculumUrl || NOTION_CURRICULUM_URL;

  const updatedNavItems = currentSettings.navItems.map((item) => {
    if (item.id === "curriculum") {
      return {
        ...item,
        path: destination === "notion" ? notionUrl : "/curriculum",
      };
    }
    return item;
  });

  const newSettings: SiteSettings = {
    ...currentSettings,
    curriculumDestination: destination,
    notionCurriculumUrl: notionUrl,
    navItems: updatedNavItems,
  };

  saveSiteSettings(newSettings);
  return newSettings;
}

/**
 * Checks whether a nav item is currently enabled.
 * Looks up by id, not path: the curriculum item's path is swapped for the
 * Notion URL when that destination is selected.
 * If the id is not one of the managed items, returns true.
 */
export function isNavItemEnabled(id: string, settings?: SiteSettings): boolean {
  const currentSettings = settings || getSiteSettings();
  const match = currentSettings.navItems.find((item) => item.id === id);
  if (!match) {
    return true;
  }
  return match.enabled;
}
