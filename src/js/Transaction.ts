import {
    ITransaction,
    ITransactionData,
    ITransactionInputData,
    ITransactionInput,
    ITransactionOutput,
    ITransactionOutputData,
} from '@/js/ITransaction'
import { CChainInfo, PChainInfo, XChainInfo, stringToBig } from '@/helper'

function getOutput(output: ITransactionOutputData): ITransactionOutput {
    return {
        addresses: output.addresses,
        amount: stringToBig(output.amount), // TODO: this Big conversion is not denominated bc of dependency on asset lookup
        assetID: output.assetID,
        id: output.id,
        locktime: output.locktime,
        outputIndex: output.outputIndex,
        outputType: output.outputType,
        redeemingTransactionID: output.redeemingTransactionID,
        threshold: output.threshold,
        timestamp: new Date(output.timestamp),
        transactionID: output.transactionID,
    }
}
/**
 * These types come from here @link https://github.com/ava-labs/ortelius/blob/643f71c5531cfd3d76fbf4c0e31b80e00d672f94/services/indexes/models/types.go#L62
 */
export const txTypeMap = new Map<string, string>([
    ['add_delegator', 'Add Delegator'],
    ['add_subnet_validator', 'Add Subnet Validator'],
    ['base', 'Base'],
    ['create_asset', 'Create Asset'],
    ['create_subnet', 'Create Subnet'],
    ['create_chain', 'Create Chain'],
    ['export', 'Export'],
    ['import', 'Import'],
    ['pvm_export', 'PVM Export'],
    ['pvm_import', 'PVM Import'],
    ['operation', 'Operation'],
    ['advance_time', 'Advance Time'],
    ['reward_validator', 'Reward Validator'],
])

export const txChainTypeMap = new Map<string, typeof CChainInfo>([
    [CChainInfo.id, CChainInfo],
    [PChainInfo.id, PChainInfo],
    [XChainInfo.id, XChainInfo],
])

export function getMappingForType(type: string) {
    return txTypeMap.get(type) || 'Unknown'
}

export function getTransactionChainType(chainID: string) {
    return txChainTypeMap.get(chainID)
}

export function getTransactionOutputs(
    outputs: ITransactionOutput[],
    chainID: string
) {
    return outputs.map((output) => {
        const chainType = getTransactionChainType(chainID)
        return {
            ...output,
            addresses: output.addresses.map(
                (address) =>
                    ({
                        address,
                        displayText: `${chainType?.code}-${address}`,
                    } as DisplayAddress)
            ),
        }
    })
}

export function getTransactionInputs(
    inputs: ITransactionInput[],
    chainId: string
) {
    return getTransactionOutputs(
        inputs.map((input) => input.output),
        chainId
    )
}

export interface DisplayAddress {
    address: string
    displayText: string
}
export class Transaction implements ITransaction {
    id: string
    inputs: ITransactionInput[]
    outputs: ITransactionOutput[]
    timestamp: string
    type: string
    chainID: string
    memo: string
    txFee: number

    constructor(data: ITransactionData) {
        this.inputs =
            data.inputs === null || data.inputs.length === 0
                ? []
                : data.inputs.map((input: ITransactionInputData) => {
                      return {
                          credentials: input.credentials,
                          output: getOutput(input.output),
                      }
                  })
        this.outputs =
            data.outputs === null || data.outputs.length === 0
                ? []
                : data.outputs.map((output: ITransactionOutputData) =>
                      getOutput(output)
                  )
        this.id = data.id
        this.timestamp = data.timestamp
        this.type = data.type
        this.chainID = data.chainID
        this.id = data.id
        this.memo = data.memo
        this.txFee = data.txFee
    }

    getInputAddresses(): string[] {
        const res: string[] = []
        const inputs = this.inputs || []

        inputs.forEach((input) => {
            res.push(...input.output.addresses)
        })

        return res
    }
}
