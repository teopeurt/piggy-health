import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './preferences.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PreferencesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const preferencesEntity = useAppSelector(state => state.preferences.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="preferencesDetailsHeading">
          <Translate contentKey="piggyHealthApp.preferences.detail.title">Preferences</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{preferencesEntity.id}</dd>
          <dt>
            <span id="weeklyGoal">
              <Translate contentKey="piggyHealthApp.preferences.weeklyGoal">Weekly Goal</Translate>
            </span>
          </dt>
          <dd>{preferencesEntity.weeklyGoal}</dd>
          <dt>
            <span id="weightUnits">
              <Translate contentKey="piggyHealthApp.preferences.weightUnits">Weight Units</Translate>
            </span>
          </dt>
          <dd>{preferencesEntity.weightUnits}</dd>
          <dt>
            <Translate contentKey="piggyHealthApp.preferences.user">User</Translate>
          </dt>
          <dd>{preferencesEntity.user ? preferencesEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/preferences" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/preferences/${preferencesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PreferencesDetail;
