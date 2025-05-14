import {defineStore} from 'pinia'
import type {DefProcess} from '@/api/flow/def-flow'
import {store,} from "@/store";
import {DictData} from "@/api/system/dict";
import defaultSettings from "@/settings";

export const useProcessStore = defineStore('process', () => {
    // state: () => ({
    //     processMap: new Map<string, DefProcess>(),
    //     currentProcessId: '',
    //     parentProcessId: '',
    //     parentNodeId: '',
    //
    // }),
    // actions: {
    //     setProcess(id: string, process: DefProcess) {
    //         this.processMap.set(id, process)
    //     },
    //     getProcess(id: string) {
    //         return this.processMap.get(id) || null
    //     },
    //
    //     setParentProcessId(id: string) {
    //         this.parentProcessId = id
    //     },
    //     getParentProcessId() {
    //         return this.parentProcessId
    //     },
    //
    // }
    const processMap = useStorage<Record<string, DefProcess>>("processMap", {});

    const parentProcessId = useStorage<string>("parentProcessId", '');

    const setProcess = (id: string, process: DefProcess) => {
        processMap.value[id] = process;
        //  processMap.value.set(id, process)
    };
    const getProcess = (id: string): DefProcess => {
        return processMap.value[id];
        // return processMap.value.get(id) || null
    };

    const setParentProcessId = (id: string) => {
        parentProcessId.value = id
    };
    const getParentProcessId = (): string => {
        return parentProcessId.value
    };

    return {
        processMap,
        setProcess,
        getProcess,
        setParentProcessId,
        getParentProcessId,
    }

})

export function useProcessStoreHook() {
    return useProcessStore(store);
}