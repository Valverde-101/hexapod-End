import React from "react"
import { Link } from "react-router-dom"
import { PATH_NAMES, ICON_COMPONENTS } from "./vars"
import translations from "../translations"
import { FaLanguage } from "react-icons/fa"

const NAV_BULLETS_PREFIX = "navBullet"
const NAV_DETAILED_PREFIX = "navDetailed"

const buildLinks = language => {
    const t = translations[language]
    const PATH_LINKS = [
        {
            path: PATH_NAMES.inverseKinematics,
            description: t.sections.inverseKinematics,
            icon: ICON_COMPONENTS.circle,
        },
        {
            path: PATH_NAMES.forwardKinematics,
            description: t.sections.forwardKinematics,
            icon: ICON_COMPONENTS.circle,
        },
        {
            path: PATH_NAMES.legPatterns,
            description: t.sections.legPatterns,
            icon: ICON_COMPONENTS.circle,
        },
        {
            path: PATH_NAMES.armControl,
            description: t.sections.armControl,
            icon: ICON_COMPONENTS.circle,
        },
        {
            path: PATH_NAMES.walkingGaits,
            description: t.sections.walkingGaits,
            icon: ICON_COMPONENTS.circle,
        },
        {
            path: PATH_NAMES.landingPage,
            description: t.sections.landingPage,
            icon: ICON_COMPONENTS.home,
        },
    ]

    const URL_LINKS = [
        {
            url: "https://ko-fi.com/minimithi",
            icon: ICON_COMPONENTS.mug,
            description: t.nav.kofi,
        },
        {
            url: "https://github.com/mithi/hexapod",
            icon: ICON_COMPONENTS.octocat,
            description: t.nav.repo,
        },
    ]

    return { PATH_LINKS, URL_LINKS }
}

const BulletPageLink = ({ link, showDesc }) => (
    <li>
        <Link to={link.path} className="link-icon">
            <span>
                {link.icon} {showDesc ? link.description : null}
            </span>
        </Link>
    </li>
)

const BulletUrlLink = ({ path, description, icon }) => (
    <li>
        <a
            href={path}
            className="link-icon"
            target="_blank"
            rel="noopener noreferrer"
            children={
                <span>
                    {icon} {description}
                </span>
            }
        />
    </li>
)

const NavBullets = ({ language, toggleLanguage }) => {
    const { PATH_LINKS, URL_LINKS } = buildLinks(language)
    return (
        <ul id="top-bar">
            {URL_LINKS.map(link => (
                <BulletUrlLink
                    path={link.url}
                    key={NAV_BULLETS_PREFIX + link.url}
                    icon={link.icon}
                />
            ))}

            {PATH_LINKS.map(link => (
                <BulletPageLink key={NAV_BULLETS_PREFIX + link.path} link={link} />
            ))}

            <li className="language-button">
                <button
                    onClick={toggleLanguage}
                    className="link-icon"
                    aria-label="toggle language"
                >
                    <span>
                        <FaLanguage className="vertical-align" />
                        {language === "es" ? " EN" : " ES"}
                    </span>
                </button>
            </li>
        </ul>
    )
}

const NavDetailed = ({ language }) => {
    const { PATH_LINKS, URL_LINKS } = buildLinks(language)
    return (
        <footer>
            <nav id="nav">
                <ul className="grid-cols-1 no-bullet">
                    {URL_LINKS.map(link => (
                        <BulletUrlLink
                            path={link.url}
                            key={NAV_DETAILED_PREFIX + link.url}
                            icon={link.icon}
                            description={link.description}
                        />
                    ))}

                    {PATH_LINKS.map(link => (
                        <BulletPageLink
                            key={NAV_DETAILED_PREFIX + link.path}
                            link={link}
                            showDesc={true}
                        />
                    ))}
                </ul>
            </nav>
        </footer>
    )
}

const Nav = ({ language, toggleLanguage }) => (
    <NavBullets language={language} toggleLanguage={toggleLanguage} />
)

export { Nav, NavDetailed }
