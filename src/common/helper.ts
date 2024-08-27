import path from 'node:path';
import fs from 'fs';
import os from 'node:os';
import { QQLevel } from '@/core';

export async function solveProblem<T extends (...arg: any[]) => any>(func: T, ...args: Parameters<T>): Promise<ReturnType<T> | undefined> {
    return new Promise<ReturnType<T> | undefined>((resolve) => {
        try {
            const result = func(...args);
            resolve(result);
        } catch (e) {
            resolve(undefined);
        }
    });
}

export async function solveAsyncProblem<T extends (...args: any[]) => Promise<any>>(func: T, ...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> {
    return new Promise<Awaited<ReturnType<T>> | undefined>((resolve) => {
        func(...args).then((result) => {
            resolve(result);
        }).catch(() => {
            resolve(undefined);
        });
    });
}

//下面这个类是用于将uid+msgid合并的类
export class UUIDConverter {
    static encode(highStr: string, lowStr: string): string {
        const high = BigInt(highStr);
        const low = BigInt(lowStr);
        const highHex = high.toString(16).padStart(16, '0');
        const lowHex = low.toString(16).padStart(16, '0');
        const combinedHex = highHex + lowHex;
        return `${combinedHex.substring(0, 8)}-${combinedHex.substring(8, 12)}-${combinedHex.substring(
            12,
            16,
        )}-${combinedHex.substring(16, 20)}-${combinedHex.substring(20)}`;
    }

    static decode(uuid: string): { high: string; low: string } {
        const hex = uuid.replace(/-/g, '');
        const high = BigInt('0x' + hex.substring(0, 16));
        const low = BigInt('0x' + hex.substring(16));
        return { high: high.toString(), low: low.toString() };
    }
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function PromiseTimer<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeoutPromise = new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('PromiseTimer: Operation timed out')), ms),
    );
    return Promise.race([promise, timeoutPromise]);
}

export async function runAllWithTimeout<T>(tasks: Promise<T>[], timeout: number): Promise<T[]> {
    const wrappedTasks = tasks.map((task) =>
        PromiseTimer(task, timeout).then(
            (result) => ({ status: 'fulfilled', value: result }),
            (error) => ({ status: 'rejected', reason: error }),
        ),
    );
    const results = await Promise.all(wrappedTasks);
    return results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as { status: 'fulfilled'; value: T }).value);
}

export function isNull(value: any) {
    return value === undefined || value === null;
}

export function isNumeric(str: string) {
    return /^\d+$/.test(str);
}

export function truncateString(obj: any, maxLength = 500) {
    if (obj !== null && typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'string') {
                // 如果是字符串且超过指定长度，则截断
                if (obj[key].length > maxLength) {
                    obj[key] = obj[key].substring(0, maxLength) + '...';
                }
            } else if (typeof obj[key] === 'object') {
                // 如果是对象或数组，则递归调用
                truncateString(obj[key], maxLength);
            }
        });
    }
    return obj;
}

export function isEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}

export function getDefaultQQVersionConfigInfo(): QQVersionConfigType {
    if (os.platform() === 'linux') {
        return {
            baseVersion: '3.2.12-27254',
            curVersion: '3.2.12-27254',
            prevVersion: '',
            onErrorVersions: [],
            buildId: '27254',
        };
    }
    return {
        baseVersion: '9.9.15-27391',
        curVersion: '9.9.15-27391',
        prevVersion: '',
        onErrorVersions: [],
        buildId: '27391',
    };
}

export function getQQVersionConfigPath(exePath: string = ''): string | undefined {
    let configVersionInfoPath;
    if (os.platform() !== 'linux') {
        configVersionInfoPath = path.join(path.dirname(exePath), 'resources', 'app', 'versions', 'config.json');
    } else {
        const userPath = os.homedir();
        const appDataPath = path.resolve(userPath, './.config/QQ');
        configVersionInfoPath = path.resolve(appDataPath, './versions/config.json');
    }
    if (typeof configVersionInfoPath !== 'string') {
        return undefined;
    }
    if (!fs.existsSync(configVersionInfoPath)) {
        return undefined;
    }
    return configVersionInfoPath;
}

export function calcQQLevel(level: QQLevel) {
    const { crownNum, sunNum, moonNum, starNum } = level;
    return crownNum * 64 + sunNum * 16 + moonNum * 4 + starNum;
}