import React from "react";
import {Button, Card, Form, Stack,} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from 'yup'
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setDesiresAction} from "../../store/candidateReducer";
export const MasterDesiresForm = () => {

  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const candidateDesires = useSelector(state => state.candidateReducer.desires)

  const validationSchema = yup.object().shape({
    desiredPlace: yup.string().required(t('form_validation.required')),
    styles: yup.string().required(t('form_validation.required')),
    idol: yup.string().required(t('form_validation.required')),
    condition: yup.string().required(t('form_validation.required')),
    items: yup.string().required(t('form_validation.required'))
  })

  const handleSubmit = (formData) => {
    dispatch(setDesiresAction(formData))
    navigate('/form/about')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={candidateDesires}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Stack gap={3}>
                  <Form.Group>
                    <Form.Label>{t('desires.country')}</Form.Label>
                    <Form.Control
                      name="desiredPlace"
                      type="text"
                      value={values.desiredPlace}
                      onChange={handleChange}
                      isInvalid={!!errors.desiredPlace && touched.desiredPlace}
                    />
                    <Form.Control.Feedback type="invalid">{errors.desiredPlace}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t('desires.styles')}</Form.Label>
                    <Form.Control
                      name="styles"
                      type="text"
                      onChange={handleChange}
                      value={values.styles}
                      isInvalid={!!errors.styles && touched.styles}
                    />
                    <Form.Control.Feedback type="invalid">{errors.styles}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t('desires.idol')}</Form.Label>
                    <Form.Control
                      name="idol"
                      type="text"
                      onChange={handleChange}
                      value={values.idol}
                      isInvalid={!!errors.idol && touched.idol}
                    />
                    <Form.Control.Feedback type="invalid">{errors.idol}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t('desires.conditions')}</Form.Label>
                    <Form.Control
                      name="condition"
                      type="text"
                      onChange={handleChange}
                      value={values.condition}
                      isInvalid={!!errors.condition && touched.condition}
                    />
                    <Form.Control.Feedback type="invalid">{errors.condition}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t('desires.items')}</Form.Label>
                    <Form.Control
                      name="items"
                      type="text"
                      onChange={handleChange}
                      value={values.items}
                      isInvalid={!!errors.items && touched.items}
                    />
                    <Form.Control.Feedback type="invalid">{errors.items}</Form.Control.Feedback>
                  </Form.Group>
                  <Button className='art-inc-button-gold' type='submit'>
                    {t('control_buttons.next')}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  )
}