export interface IValidator {
    nodeID: string              // validator node id
    startTime: Date
    endTime: Date
    
    
    address?: string            // Primary Network only. payout address (not the address who staked) 
    
    stakeAmount?: number        // Primary Network only
    totalStakeAmount?: number   // Primary Network only. sum of validator and delegator stake amounts
    delegators?: IValidator[]   // Primary Network only. a validator contains delegators if they have the same node id
    
    weight?: number             // non-Primary Network only. analogous to stakeAmount
    
    
    rank?: number               // based on stake or weight
    elapsed?: number            // how much of the staking period has elasped (%)
}

export interface IStakingData {
    nodeID: string                      // "NodeID-L7L9PNUDoSGrep7kbbffoApvRgdVxLJdo"
    startTime: string                   // "1598980959"
    endTime: string                     // "1599980959"    
    potentialReward?: string            // "733" 
    
    rewardOwner?: IRewardOwnerData
    stakeAmount?: string                // "17000000"
    weight?: string
    
    delegationFee?: string              // "100.0000"
    uptime?: string                     // "0.9892"
    connected?: boolean                 // false
}

/* ==========================================
   PRIMARY NETWORK
   ========================================== */

export interface IValidator_New {
    nodeID:             string
    startTime:          Date
    endTime:            Date    
    // Primary Network Properties
    rewardOwner?:       IRewardOwner    // Primary Network only. payout address (not the address who staked) 
    potentialReward?:   number
    stakeAmount?:       number
    uptime?:            number      // percentage 
    connected?:         boolean
    delegationFee?:     number
    // Non-Primary Network Properties
    weight?:            number
}

export interface IDelegator_New {
    nodeID:             string
    startTime:          Date
    endTime:            Date    
    // Primary Network Properties (Delegators only apply to Primary Network)
    rewardOwner:        IRewardOwner
    potentialReward:    number
    stakeAmount:        number
}

export interface IRewardOwner {
    locktime:           number      // 0
    threshold:          number      // 1
    addresses:          string[]    // ["P-everest1szs36y7mmr99lsyj8g427zju7dhdrm6qscj2qa"]
}

export interface IPendingValidator_New {
    nodeID:             string
    startTime:          Date
    endTime:            Date
    stakeAmount:        number
    
    connected:          boolean     // different prop name from other response
    delegationFee:      number
}

/* ==========================================
   API DATA
   ========================================== */

export interface IValidatorData {
    nodeID:             string
    startTime:          string
    endTime:            string
    // Primary Network Properties
    rewardOwner?:       IRewardOwnerData
    potentialReward?:   string
    stakeAmount?:       string
    uptime?:            string
    connected?:         boolean
    delegationFee?:     string
    // Non-Primary Network Properties
    weight?:            string      // this is arbitrarily set
}

export interface IDelegatorData {
    nodeID:             string
    startTime:          string
    endTime:            string
    rewardOwner:        IRewardOwnerData
    potentialReward:    string
    stakeAmount:        string
}

export interface IRewardOwnerData {
    locktime:           string      // "0"
    threshold:          string      // "1"
    addresses:          string[]    // ["P-everest1szs36y7mmr99lsyj8g427zju7dhdrm6qscj2qa"]
                                    // extensible, but will only contain one address for now
}

export interface IPendingValidatorData {
    nodeID:             string
    startTime:          string
    endTime:            string
    
    stakeAmount:        string
    
    connected:          boolean
    delegationFee:      string
}
