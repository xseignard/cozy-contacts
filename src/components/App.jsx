/* global cozy */
import React, { useEffect } from 'react'
import flow from 'lodash/flow'

import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Title } from 'cozy-ui/transpiled/react/Text'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import flag, { FlagSwitcher } from 'cozy-flags'

import { SelectedGroupProvider } from './Contexts/SelectedGroup'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import useFlags from './Hooks/useFlags'
import container from './AppContainer'
import ContentWrapper from './ContentWrapper'

const ContactsApp = props => {
  useFlags()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar
  const { cleanTrashedGroups } = props

  useEffect(() => {
    cleanTrashedGroups()
  }, [cleanTrashedGroups])

  return (
    <SelectedGroupProvider>
      <Layout monocolumn="true">
        {isMobile && (
          <BarCenter>
            <Title>
              <span className={'fil-path-title'}>Contacts</span>
            </Title>
          </BarCenter>
        )}
        <Main>
          {flag('switcher') && <FlagSwitcher />}
          <ContactsSelectionBar />
          <ContentWrapper />
          <Alerter t={t} />
          <ModalManager />
        </Main>
        <IconSprite />
      </Layout>
    </SelectedGroupProvider>
  )
}

export default flow(container)(ContactsApp)
