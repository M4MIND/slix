import Mesh from '../mesh/Mesh';
import { Vector3 } from 'mathf';
import { Uint16NativeArray } from 'memory';

export default class IcoSphere extends Mesh {
    constructor() {
        super();

        this.vertices = [
            new Vector3(0, -1, 0),
            new Vector3(0.723607, -0.44722, 0.525725),
            new Vector3(-0.276388, -0.44722, 0.850649),
            new Vector3(-0.894426, -0.447216, 0),
            new Vector3(-0.276388, -0.44722, -0.850649),
            new Vector3(0.723607, -0.44722, -0.525725),
            new Vector3(0.276388, 0.44722, 0.850649),
            new Vector3(-0.723607, 0.44722, 0.525725),
            new Vector3(-0.723607, 0.44722, -0.525725),
            new Vector3(0.276388, 0.44722, -0.850649),
            new Vector3(0.894426, 0.447216, 0),
            new Vector3(0, 1, 0),
            new Vector3(-0.162456, -0.850654, 0.499995),
            new Vector3(0.425323, -0.850654, 0.309011),
            new Vector3(0.262869, -0.525738, 0.809012),
            new Vector3(0.850648, -0.525736, 0),
            new Vector3(0.425323, -0.850654, -0.309011),
            new Vector3(-0.52573, -0.850652, 0),
            new Vector3(-0.688189, -0.525736, 0.499997),
            new Vector3(-0.162456, -0.850654, -0.499995),
            new Vector3(-0.688189, -0.525736, -0.499997),
            new Vector3(0.262869, -0.525738, -0.809012),
            new Vector3(0.951058, 0, 0.309013),
            new Vector3(0.951058, 0, -0.309013),
            new Vector3(0, 0, 1),
            new Vector3(0.587786, 0, 0.809017),
            new Vector3(-0.951058, 0, 0.309013),
            new Vector3(-0.587786, 0, 0.809017),
            new Vector3(-0.587786, 0, -0.809017),
            new Vector3(-0.951058, 0, -0.309013),
            new Vector3(0.587786, 0, -0.809017),
            new Vector3(0, 0, -1),
            new Vector3(0.688189, 0.525736, 0.499997),
            new Vector3(-0.262869, 0.525738, 0.809012),
            new Vector3(-0.850648, 0.525736, 0),
            new Vector3(-0.262869, 0.525738, -0.809012),
            new Vector3(0.688189, 0.525736, -0.499997),
            new Vector3(0.162456, 0.850654, 0.499995),
            new Vector3(0.52573, 0.850652, 0),
            new Vector3(-0.425323, 0.850654, 0.309011),
            new Vector3(-0.425323, 0.850654, -0.309011),
            new Vector3(0.162456, 0.850654, -0.499995),
        ];

        this.normals = [
            new Vector3(0.1024, -0.9435, 0.3151),
            new Vector3(0.7002, -0.6617, 0.268),
            new Vector3(-0.268, -0.9435, 0.1947),
            new Vector3(-0.268, -0.9435, -0.1947),
            new Vector3(0.1024, -0.9435, -0.3151),
            new Vector3(0.905, -0.3304, 0.268),
            new Vector3(0.0247, -0.3304, 0.9435),
            new Vector3(-0.8897, -0.3304, 0.3151),
            new Vector3(-0.5746, -0.3304, -0.7488),
            new Vector3(0.5346, -0.3304, -0.7779),
            new Vector3(0.8026, -0.1256, 0.5831),
            new Vector3(-0.3066, -0.1256, 0.9435),
            new Vector3(-0.9921, -0.1256, 0),
            new Vector3(-0.3066, -0.1256, -0.9435),
            new Vector3(0.8026, -0.1256, -0.5831),
            new Vector3(0.4089, 0.6617, 0.6284),
            new Vector3(-0.4713, 0.6617, 0.5831),
            new Vector3(-0.7002, 0.6617, -0.268),
            new Vector3(0.0385, 0.6617, -0.7488),
            new Vector3(0.724, 0.6617, -0.1947),
            new Vector3(0.268, 0.9435, -0.1947),
            new Vector3(0.4911, 0.7947, -0.3568),
            new Vector3(0.4089, 0.6617, -0.6284),
            new Vector3(-0.1024, 0.9435, -0.3151),
            new Vector3(-0.1876, 0.7947, -0.5773),
            new Vector3(-0.4713, 0.6617, -0.5831),
            new Vector3(-0.3313, 0.9435, 0),
            new Vector3(-0.6071, 0.7947, 0),
            new Vector3(-0.7002, 0.6617, 0.268),
            new Vector3(-0.1024, 0.9435, 0.3151),
            new Vector3(-0.1876, 0.7947, 0.5773),
            new Vector3(0.0385, 0.6617, 0.7488),
            new Vector3(0.268, 0.9435, 0.1947),
            new Vector3(0.4911, 0.7947, 0.3568),
            new Vector3(0.724, 0.6617, 0.1947),
            new Vector3(0.8897, 0.3304, -0.3151),
            new Vector3(0.7947, 0.1876, -0.5773),
            new Vector3(0.5746, 0.3304, -0.7488),
            new Vector3(-0.0247, 0.3304, -0.9435),
            new Vector3(-0.3035, 0.1876, -0.9342),
            new Vector3(-0.5346, 0.3304, -0.7779),
            new Vector3(-0.905, 0.3304, -0.268),
            new Vector3(-0.9822, 0.1876, 0),
            new Vector3(-0.905, 0.3304, 0.268),
            new Vector3(-0.5346, 0.3304, 0.7779),
            new Vector3(-0.3035, 0.1876, 0.9342),
            new Vector3(-0.0247, 0.3304, 0.9435),
            new Vector3(0.5746, 0.3304, 0.7488),
            new Vector3(0.7947, 0.1876, 0.5773),
            new Vector3(0.8897, 0.3304, 0.3151),
            new Vector3(0.3066, 0.1256, -0.9435),
            new Vector3(0.3035, -0.1876, -0.9342),
            new Vector3(0.0247, -0.3304, -0.9435),
            new Vector3(-0.8026, 0.1256, -0.5831),
            new Vector3(-0.7947, -0.1876, -0.5773),
            new Vector3(-0.8897, -0.3304, -0.3151),
            new Vector3(-0.8026, 0.1256, 0.5831),
            new Vector3(-0.7947, -0.1876, 0.5773),
            new Vector3(-0.5746, -0.3304, 0.7488),
            new Vector3(0.3066, 0.1256, 0.9435),
            new Vector3(0.3035, -0.1876, 0.9342),
            new Vector3(0.5346, -0.3304, 0.7779),
            new Vector3(0.9921, 0.1256, 0),
            new Vector3(0.9822, -0.1876, 0),
            new Vector3(0.905, -0.3304, -0.268),
            new Vector3(0.4713, -0.6617, -0.5831),
            new Vector3(0.1876, -0.7947, -0.5773),
            new Vector3(-0.0385, -0.6617, -0.7488),
            new Vector3(-0.4089, -0.6617, -0.6284),
            new Vector3(-0.4911, -0.7947, -0.3568),
            new Vector3(-0.724, -0.6617, -0.1947),
            new Vector3(-0.724, -0.6617, 0.1947),
            new Vector3(-0.4911, -0.7947, 0.3568),
            new Vector3(-0.4089, -0.6617, 0.6284),
            new Vector3(0.7002, -0.6617, -0.268),
            new Vector3(0.6071, -0.7947, 0),
            new Vector3(0.3313, -0.9435, 0),
            new Vector3(-0.0385, -0.6617, 0.7488),
            new Vector3(0.1876, -0.7947, 0.5773),
            new Vector3(0.4713, -0.6617, 0.5831),
        ];

        this.triangles = new Uint16NativeArray([
            0, 13, 12, 1, 13, 15, 0, 12, 17, 0, 17, 19, 0, 19, 16, 1, 15, 22, 2, 14, 24, 3, 18, 26, 4, 20, 28, 5, 21,
            30, 1, 22, 25, 2, 24, 27, 3, 26, 29, 4, 28, 31, 5, 30, 23, 6, 32, 37, 7, 33, 39, 8, 34, 40, 9, 35, 41, 10,
            36, 38, 38, 41, 11, 38, 36, 41, 36, 9, 41, 41, 40, 11, 41, 35, 40, 35, 8, 40, 40, 39, 11, 40, 34, 39, 34, 7,
            39, 39, 37, 11, 39, 33, 37, 33, 6, 37, 37, 38, 11, 37, 32, 38, 32, 10, 38, 23, 36, 10, 23, 30, 36, 30, 9,
            36, 31, 35, 9, 31, 28, 35, 28, 8, 35, 29, 34, 8, 29, 26, 34, 26, 7, 34, 27, 33, 7, 27, 24, 33, 24, 6, 33,
            25, 32, 6, 25, 22, 32, 22, 10, 32, 30, 31, 9, 30, 21, 31, 21, 4, 31, 28, 29, 8, 28, 20, 29, 20, 3, 29, 26,
            27, 7, 26, 18, 27, 18, 2, 27, 24, 25, 6, 24, 14, 25, 14, 1, 25, 22, 23, 10, 22, 15, 23, 15, 5, 23, 16, 21,
            5, 16, 19, 21, 19, 4, 21, 19, 20, 4, 19, 17, 20, 17, 3, 20, 17, 18, 3, 17, 12, 18, 12, 2, 18, 15, 16, 5, 15,
            13, 16, 13, 0, 16, 12, 14, 2, 12, 13, 14, 13, 1, 14,
        ]);
    }
}
