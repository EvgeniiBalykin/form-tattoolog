import React from "react";
import './Banner.css'
import {Col, Container, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import {MasterDesiresForm} from "../../views/MasterForm/MasterDesiresForm";
import {AboutMasterForm} from "../../views/MasterForm/AboutMasterForm";
import {useTranslation} from "react-i18next";

export default React.memo(() => {
  const { t } = useTranslation()
  return (
    <div className='banner art-inc-bg-light-dark'>

      <Container className='py-5'>
        <Row className='justify-content-between'>
          <Col
            xs={12}
            lg={6}
            className='d-flex justify-content-center align-items-center'
          >
            <div className='condition my-5 text-center'>
              <h3>{t('banner.little_story')}</h3>
              <h1 className='art-inc-color-gold'>{t('banner.prize')}</h1>
              <p style={{maxWidth: '300px'}}>{t('banner.conditions')}</p>
            </div>
          </Col>
          <Col
            xs={12}
            lg={5}
          >
            <Routes>
              <Route path="/desires" element={<MasterDesiresForm/>}/>
              <Route path="/about" element={<AboutMasterForm/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  )
})