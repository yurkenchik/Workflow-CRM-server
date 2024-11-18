import {IsolationLevel} from "@mikro-orm/core";
import {EntityManagerNotFoundException} from "src/common/exceptions/400-client/404/entity-manager-not-found.exception";

export function Transactional(options?: { isolationLevel: IsolationLevel }) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            const entityManager = this.entityManager;
            if (!entityManager) {
                throw new EntityManagerNotFoundException();
            }

            return entityManager.transactional(
                async (transactionalEntityManager) => {
                    Object.defineProperty(this, "entityManager", {
                        value: transactionalEntityManager,
                        writable: true,
                    });

                    return originalMethod.apply(this, args);
                },
                options
            );
        };

        return descriptor;
    }
}