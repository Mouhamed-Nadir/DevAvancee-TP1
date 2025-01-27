import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto';
import {v4 as uuidv4} from 'uuid';


/* Chemin de stockage des blocks */
const path = './data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    const blocks = await readFile(path)
    return JSON.parse(blocks)
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks()

    return blocks === null ? null : blocks[blocks.length - 1] || null
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const blocksSaved = await findBlocks()
    const blocksNew = Array.isArray(blocksSaved) ? blocksSaved : []
    const lastBlock = await findLastBlock()
    const newSecretHash = lastBlock == null ? monSecret : JSON.stringify(lastBlock)
    const newBlock= {
        id: uuidv4(),
        nom: contenu.nom,
        don: contenu.don,
        date: getDate(),
        hash: createHash("sha256").update(newSecretHash).digest('hex')
    }

    blocksNew.push(newBlock)
    await writeFile(path, JSON.stringify(blocksNew))
    return blocksNew
}

