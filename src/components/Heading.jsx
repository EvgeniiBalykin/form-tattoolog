import React from "react";
import { Container, Navbar, Image, Col, Nav } from "react-bootstrap";
import "./Heading.css";

export const Heading = ({ showPartners = true }) => {
  const logo = {
    width: 105,
    height: 60,
  };

  return (
    <Navbar className="art-inc-bg-dark header-height w-100">
      <Container>
        <Col className="text-center">
          <Navbar.Brand href="https://association-tattoo.com/">
            <Image
              src="/img/Logo_2.svg"
              width={logo.width}
              height={logo.height}
            />
          </Navbar.Brand>
        </Col>
        {showPartners && (
          <Col className="d-none d-lg-flex justify-content-center">
            <Nav.Link target="_blank" href="#">
              <Image
                className="header-logo"
                src="/img/global_association_logo.png"
                width={logo.width}
                height={logo.height}
              />
            </Nav.Link>
            <Nav.Link target="_blank" href="https://association-tattoo.com/">
              <Image
                className="header-logo"
                src="https://thumb.tildacdn.com/tild3061-3635-4536-b635-373261613866/-/resize/418x/-/format/webp/tattooassocation_whi.png"
                width={logo.width}
                height={logo.height}
              />
            </Nav.Link>
            <Nav.Link target="_blank" href="https://tattoo-association.com/">
              <Image
                style={{ filter: "invert(1)" }}
                className="header-logo"
                src="/img/association_ua.png"
                width={logo.width}
                height={logo.height}
              />
            </Nav.Link>
          </Col>
        )}
      </Container>
    </Navbar>
  );
};
