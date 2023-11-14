import React, {useEffect, useState} from "react";
import {Button, Card, Form, Spinner, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup"
import {useTranslation} from "react-i18next";
import "yup-phone-lite";
import {useDispatch, useSelector} from "react-redux";
import {setAboutAction} from "../../store/candidateReducer";
import axios from "axios";
import {Result} from "../../components/Result";
import {XCircle, CheckCircle} from "react-bootstrap-icons";
import {getAPIAddrPL} from "../../helpers/url";
export const AboutMasterForm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const candidateAbout = useSelector(state => state.candidateReducer.about)
  const candidateDesires = useSelector(state => state.candidateReducer.desires)

  const [isLoading, setIsLodading] = useState(false)
  const [candidateId, setCandidateId] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('form_validation.required')),
    phone: yup
      .string()
      .phone([], t('form_validation.invalid_phone'))
      .required(t('form_validation.required')),
    link: yup
      .string()
      .required(t('form_validation.required')),
    place: yup
      .string()
      .required(t('form_validation.required')),
  })

  useEffect(() => {
    Object.values(candidateDesires).every(value => value !== "") || navigate('/form/desires')
  }, [candidateDesires, navigate])
  const submitForm = (formData) => {
    setIsLodading(true)

    dispatch(setAboutAction(formData))
    const comment = `
      Любимые стили тату: ${candidateDesires.styles}
      Кумир: ${candidateDesires.idol}
      Условия работы: ${candidateDesires.condition}
      Лучшие материалы и инструменты: ${candidateDesires.items}
      ${formData.wantWork ? 'Хочет получать предложения о работе' : ''}
      ${formData.wantWorldTattoo ? 'Хочет стать частью мировой тату-индустрии' : ''}
    `
    const data = {
      first_name: formData.name,
      last_name: '-',
      phone: formData.phone,
      social_media_link: formData.link,
      country: formData.place,
      comment
    }

    axios
      .post(
    `${getAPIAddrPL()}/api/v1/candidates/employees/`,
        data
      )
      .then((response)=> {
        setIsSuccess(true)
        setCandidateId(response.data.id)
      })
      .catch(()=> {
        setIsError(true)
      })
      .finally(() => {
        setIsLodading(false)
      })
  }

  return (
    <>
      { (!isSuccess && !isError) &&
        <Card>
          <Card.Body>
            {!isSuccess && <Formik
              initialValues={candidateAbout}
              onSubmit={submitForm}
              validationSchema={validateSchema}
            >
              {({handleSubmit, touched, handleChange, errors, values}) => (
                <Form onSubmit={handleSubmit}>
                  <Stack gap={3}>
                    <Form.Group>
                      <Form.Label>{t('about.name')}</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name && touched.name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('about.phone')}</Form.Label>
                      <Form.Control
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone && touched.phone}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('about.social_media_link')}</Form.Label>
                      <Form.Control
                        name="link"
                        type="text"
                        value={values.link}
                        onChange={handleChange}
                        isInvalid={!!errors.link && touched.link}
                      />
                      <Form.Control.Feedback type="invalid">{errors.link}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>{t('about.place')}</Form.Label>
                      <Form.Control
                        name="place"
                        type="text"
                        value={values.place}
                        onChange={handleChange}
                        isInvalid={!!errors.place && touched.place}
                      />
                      <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        name="wantWorldTattoo"
                        onChange={handleChange}
                        checked={values.wantWorldTattoo}
                        label={t('about.want_world_tattoo')}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        name="wantWork"
                        onChange={handleChange}
                        checked={values.wantWork}
                        label={t('about.want_work')}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        required
                        label={t('about.terms')}
                      />
                    </Form.Group>
                    <Button className='art-inc-button-gold' disabled={isLoading} type='submit'>
                      {isLoading && <Spinner className='me-2' size='sm'/>}
                      <span>{t('control_buttons.submit')}</span>
                    </Button>
                    <Button disabled={isLoading} onClick={() => {
                      navigate('/form/desires')
                    }} variant="secondary">
                      {t('control_buttons.back')}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>}
          </Card.Body>
        </Card>
      }

      {isSuccess &&
        <Result
          icon={<CheckCircle/>}
          variant='Success'
          header={t('messages.success')}
          message={t('messages.success_msg', {id: candidateId})}
        />
      }
      {isError &&
        <Result
          icon={<XCircle/>}
          variant='danger'
          header={t('messages.error')}
          message={t('messages.error_msg')}
        />
      }
    </>

  )
}