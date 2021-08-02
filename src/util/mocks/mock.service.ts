export const mockService = {
    getAll: jest.fn(() => Promise.resolve([]) as Promise<any[]>),
    getOne: jest.fn(id => null as any),
    getOneOrFail: jest.fn(id => null as any),
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    delete: jest.fn(id => id),
}