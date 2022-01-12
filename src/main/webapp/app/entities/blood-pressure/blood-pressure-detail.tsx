import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './blood-pressure.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BloodPressureDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const bloodPressureEntity = useAppSelector(state => state.bloodPressure.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bloodPressureDetailsHeading">
          <Translate contentKey="piggyHealthApp.bloodPressure.detail.title">BloodPressure</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bloodPressureEntity.id}</dd>
          <dt>
            <span id="timestamp">
              <Translate contentKey="piggyHealthApp.bloodPressure.timestamp">Timestamp</Translate>
            </span>
          </dt>
          <dd>
            {bloodPressureEntity.timestamp ? (
              <TextFormat value={bloodPressureEntity.timestamp} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="systolic">
              <Translate contentKey="piggyHealthApp.bloodPressure.systolic">Systolic</Translate>
            </span>
          </dt>
          <dd>{bloodPressureEntity.systolic}</dd>
          <dt>
            <span id="diastolic">
              <Translate contentKey="piggyHealthApp.bloodPressure.diastolic">Diastolic</Translate>
            </span>
          </dt>
          <dd>{bloodPressureEntity.diastolic}</dd>
          <dt>
            <Translate contentKey="piggyHealthApp.bloodPressure.user">User</Translate>
          </dt>
          <dd>{bloodPressureEntity.user ? bloodPressureEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/blood-pressure" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/blood-pressure/${bloodPressureEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BloodPressureDetail;
