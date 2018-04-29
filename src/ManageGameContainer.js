import ManageGame from './ManageGame'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    GameFactory: state.contracts.GameFactory,
    drizzleStatus: state.drizzleStatus
  }
};

const ManageGameContainer = drizzleConnect(ManageGame, mapStateToProps);

export default ManageGameContainer
