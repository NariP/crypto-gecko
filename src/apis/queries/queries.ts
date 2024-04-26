import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import bookmarksQueries from '@/apis/queries/bookmarksQueries';
import coinQueries from '@/apis/queries/coinQueries';
import simpleQueries from '@/apis/queries/simpleQueries';
import type { inferQueryKeyStore } from '@lukemorales/query-key-factory';

const queries = mergeQueryKeys(coinQueries, bookmarksQueries, simpleQueries);

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export default queries;
