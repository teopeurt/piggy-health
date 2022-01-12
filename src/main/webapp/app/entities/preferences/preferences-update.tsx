import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './preferences.reducer';
import { IPreferences } from 'app/shared/model/preferences.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Units } from 'app/shared/model/enumerations/units.model';

export const PreferencesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const preferencesEntity = useAppSelector(state => state.preferences.entity);
  const loading = useAppSelector(state => state.preferences.loading);
  const updating = useAppSelector(state => state.preferences.updating);
  const updateSuccess = useAppSelector(state => state.preferences.updateSuccess);
  const unitsValues = Object.keys(Units);
  const handleClose = () => {
    props.history.push('/preferences');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...preferencesEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          weightUnits: 'KG',
          ...preferencesEntity,
          user: preferencesEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="piggyHealthApp.preferences.home.createOrEditLabel" data-cy="PreferencesCreateUpdateHeading">
            <Translate contentKey="piggyHealthApp.preferences.home.createOrEditLabel">Create or edit a Preferences</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="preferences-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('piggyHealthApp.preferences.weeklyGoal')}
                id="preferences-weeklyGoal"
                name="weeklyGoal"
                data-cy="weeklyGoal"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 10, message: translate('entity.validation.min', { min: 10 }) },
                  max: { value: 21, message: translate('entity.validation.max', { max: 21 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('piggyHealthApp.preferences.weightUnits')}
                id="preferences-weightUnits"
                name="weightUnits"
                data-cy="weightUnits"
                type="select"
              >
                {unitsValues.map(units => (
                  <option value={units} key={units}>
                    {translate('piggyHealthApp.Units.' + units)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="preferences-user"
                name="user"
                data-cy="user"
                label={translate('piggyHealthApp.preferences.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/preferences" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PreferencesUpdate;
