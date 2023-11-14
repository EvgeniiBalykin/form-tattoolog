import React from "react";
import {Container, Navbar, ButtonGroup, Button, Image, Col, Nav} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import './Heading.css'

export const Heading = ({showPartners = true}) => {
  const { i18n } = useTranslation();
  const languages = ["ru", "en"];

  const logo = {
    width:  105,
    height: 60,
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Navbar
      // style={{position: "absolute", top: 0, zIndex: 3}}
      className="art-inc-bg-dark header-height w-100"
    >
      <Container>
        <Col>
          <Navbar.Brand href="https://art-ink-corp.com/">
            <Image src="https://thumb.tildacdn.com/tild6332-3064-4430-a230-313637343466/-/resize/234x/-/format/webp/art_ink.png" width={logo.width} height={logo.height}/>
          </Navbar.Brand>
        </Col>
        {showPartners && (
          <Col className="d-none d-lg-flex justify-content-center">
            <Nav.Link target="_blank" href="#">
              <Image className="header-logo" src="/img/global_association_logo.png" width={logo.width} height={logo.height}/>
            </Nav.Link>
            <Nav.Link target="_blank" href="https://association-tattoo.com/">
              <Image className="header-logo" src="https://thumb.tildacdn.com/tild3061-3635-4536-b635-373261613866/-/resize/418x/-/format/webp/tattooassocation_whi.png" width={logo.width} height={logo.height}/>
            </Nav.Link>
            <Nav.Link target="_blank" href="https://tattoo-association.com/">
              <Image style={{filter: 'invert(1)'}} className="header-logo" src="/img/association_ua.png" width={logo.width} height={logo.height}/>
            </Nav.Link>
          </Col>
        )}
        

        <Col className="d-flex justify-content-end">
          <ButtonGroup size="sm">
            {languages.map((lang) => (
              lang !== i18n.language && (
                <Button className="px-3" variant="outline-secondary" onClick={() => changeLanguage(lang)} key={lang}>
                  {lang.toUpperCase()}
                </Button>
              )
            ))}
          </ButtonGroup>
        </Col>
      </Container>
    </Navbar>
  );
};
