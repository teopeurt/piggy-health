import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './points.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PointsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const pointsEntity = useAppSelector(state => state.points.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pointsDetailsHeading">
          <Translate contentKey="piggyHealthApp.points.detail.title">Points</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.id}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="piggyHealthApp.points.date">Date</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.date ? <TextFormat value={pointsEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="exercise">
              <Translate contentKey="piggyHealthApp.points.exercise">Exercise</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.exercise}</dd>
          <dt>
            <span id="meals">
              <Translate contentKey="piggyHealthApp.points.meals">Meals</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.meals}</dd>
          <dt>
            <span id="alcohol">
              <Translate contentKey="piggyHealthApp.points.alcohol">Alcohol</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.alcohol}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="piggyHealthApp.points.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{pointsEntity.notes}</dd>
          <dt>
            <Translate contentKey="piggyHealthApp.points.user">User</Translate>
          </dt>
          <dd>{pointsEntity.user ? pointsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/points" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/points/${pointsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PointsDetail;
